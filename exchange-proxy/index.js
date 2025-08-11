const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Install this: npm install cors
const app = express();

// Replace this with the target server URL
const targetUrl = 'https://api.backpack.exchange';

// CORS configuration - this is more reliable than manual headers
const corsOptions = {
    origin: [
        'https://exchange-project-xqga.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'https://exchange-project.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Origin', 
        'X-Requested-With', 
        'Content-Type', 
        'Accept', 
        'Authorization', 
        'Cache-Control', 
        'Pragma',
        'X-API-Key'
    ],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Use CORS middleware
app.use(cors(corsOptions));

// Additional manual CORS headers as fallback
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        target: targetUrl,
        cors: 'enabled'
    });
});

// Proxy middleware - IMPORTANT: This should be AFTER CORS setup
app.use('/', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: true,
    followRedirects: true,
    logLevel: 'info',
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[${new Date().toISOString()}] Proxying: ${req.method} ${req.url}`);
        
        // Remove host header to avoid conflicts
        proxyReq.removeHeader('host');
        
        // Set proper headers
        proxyReq.setHeader('User-Agent', 'Exchange-Proxy-Server');
        proxyReq.setHeader('Accept', 'application/json');
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`[${new Date().toISOString()}] Response: ${proxyRes.statusCode} for ${req.url}`);
        
        // Ensure CORS headers are set on proxy response
        proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
        proxyRes.headers['access-control-allow-credentials'] = 'true';
    },
    onError: (err, req, res) => {
        console.error('[Proxy Error]:', err.message);
        res.status(500).json({
            error: 'Proxy error',
            message: err.message,
            timestamp: new Date().toISOString()
        });
    }
}));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(` Proxy server running on port ${port}`);
    console.log(` Target URL: ${targetUrl}`);
    console.log(` CORS enabled for frontend domains`);
});