# Exchange App

A professional cryptocurrency exchange platform built with **Next.js** and **Node.js**, featuring real-time market data, advanced trading charts, and seamless order management.

## Screenshots

### Markets Overview
![Trading Interface](assets/Screenshot%20from%202025-08-12%2012-21-10.png)
*View real-time market data with price changes and trading volumes*

### Trading Interface  
![Markets Overview](assets/Screenshot%20from%202025-08-12%2012-21-39.png)
*Advanced trading interface with candlestick charts and order book*

## Features

- **Real-time Market Data** - Live price feeds and market statistics
- **Advanced Charts** - Interactive candlestick charts with technical indicators
- **Order Book** - Live bid/ask orders with depth visualization  
- **Trading Interface** - Professional buy/sell order placement
- **Live Data Updates** - Real-time price and volume updates
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern UI/UX** - Clean, professional interface design

## Tech Stack

### Frontend
- **Next.js** - React framework for production
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js / Recharts** - Data visualization
- **Axios** - HTTP client for API requests

### Backend (Proxy Server)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **http-proxy-middleware** - API proxy middleware

### External APIs
- **Backpack Exchange API** - Market data and trading endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/crypto-exchange-app.git
cd crypto-exchange-app
```

### 2. Install Dependencies

For the Next.js frontend:
```bash
cd frontend
npm install
# or
yarn install
```

For the Node.js backend:
```bash
cd backend
npm install cors express http-proxy-middleware
# or
yarn add cors express http-proxy-middleware
```

### 3. Environment Setup

Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### 4. Start the Backend Proxy Server

```bash
cd backend
node server.js
```

The proxy server will run on `http://localhost:3002`

### 5. Start the Frontend Development Server

```bash
cd frontend
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Backend Configuration

The backend proxy server handles API requests to avoid CORS issues:

```javascript
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const targetUrl = 'https://api.backpack.exchange';

// Configure CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT, 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// Proxy middleware
app.use('/', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Request handling
    },
    onProxyRes: (proxyRes, req, res) => {
        // Response handling
    }
}));

const port = 3002;
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
```

## API Endpoints

The application uses the following public endpoints:

- `GET /api/v1/markets` - Get all available markets
- `GET /api/v1/ticker?symbol=BTC_USDC` - Get ticker data for a symbol
- `GET /api/v1/tickers` - Get ticker data for all symbols
- `GET /api/v1/depth?symbol=BTC_USDC` - Get order book depth
- `GET /api/v1/trades?symbol=BTC_USDC` - Get recent trades
- `GET /api/v1/klines?symbol=BTC_USDC&interval=1h` - Get candlestick data

## Project Structure

```
crypto-exchange-app/
├── frontend/                 # Next.js application
│   ├── components/          # React components
│   │   ├── Chart/          # Chart components
│   │   ├── Markets/        # Markets table
│   │   ├── OrderBook/      # Order book component
│   │   └── Trading/        # Trading interface
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes
│   │   ├── markets/        # Markets page
│   │   └── trade/          # Trading pages
│   ├── styles/             # CSS styles
│   ├── utils/              # Utility functions
│   └── hooks/              # Custom React hooks
├── backend/                 # Node.js proxy server
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
├── README.md
└── package.json
```

## Key Components

### Markets Component
- Displays real-time market data
- Sortable columns for price, change, and volume
- Live data updates every few seconds

### Trading Interface
- Interactive price chart with candlesticks
- Order book with bid/ask prices
- Buy/sell order placement forms
- Balance and portfolio information

### Chart Component
- Candlestick charts using Chart.js or similar
- Multiple timeframe options (1m, 5m, 1h, 1d)
- Technical indicators and overlays

## Features Walkthrough

1. **Markets Page**: View all available cryptocurrency pairs with real-time prices
2. **Trading Interface**: Click on any market to access the full trading interface
3. **Live Charts**: Analyze price movements with interactive candlestick charts
4. **Order Book**: View current market depth and pending orders
5. **Order Placement**: Place buy/sell orders with various order types

## Customization

### Adding New Market Data
```javascript
// In your API utility file
export const fetchMarketData = async (symbol) => {
  const response = await fetch(`${API_URL}/api/v1/ticker?symbol=${symbol}`);
  return response.json();
};
```

### Styling
The app uses Tailwind CSS for styling. Customize the design by modifying:
- `tailwind.config.js` - Theme configuration
- Component CSS classes
- Global styles in `styles/globals.css`

## Troubleshooting

### CORS Issues
- Ensure the backend proxy server is running
- Check that the API URL is correctly set in environment variables

### API Rate Limiting
- Implement caching for frequently accessed data
- Add delays between API calls if needed

### Connection Issues
- Verify the Backpack Exchange API is accessible
- Check network connectivity and firewall settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Backpack Exchange](https://backpack.exchange) for providing the API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility classes

## Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by [Your Name]**
