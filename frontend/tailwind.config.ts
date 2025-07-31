import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	fontSize: {
  		xs: '0.7rem',
  		sm: '0.8rem',
  		base: '1rem',
  		lg: '1.125rem',
  		xl: '1.25rem',
  		'2xl': '1.5rem',
  		'3xl': '1.875rem'
  	},
  	extend: {
  		colors: {
  			greenBackgroundTransparent: 'rgba(0,194,120,.12)',
  			redBackgroundTransparent: 'rgba(234,56,59,.12)',
  			baseBackgroundL2: 'rgb(32,33,39)',
  			baseBackgroundL3: 'rgb(32,33,39)',
  			greenPrimaryButtonBackground: 'rgb(0,194,120)',
  			slate: {
  				'300': 'rgb(203,213,225)',
  				'400': 'rgb(148,163,184)',
  				'500': 'rgb(100,116,139)',
  				'800': 'rgb(30,41,59)',
  				'900': 'rgb(15,23,42)',
  				'950': 'rgb(2,6,23)'
  			},
  			blue: {
  				'300': 'rgb(147,197,253)',
  				'400': 'rgb(96,165,250)',
  				'500': 'rgb(59,130,246)'
  			},
  			green: {
  				'400': 'rgb(74,222,128)'
  			},
  			red: {
  				'400': 'rgb(248,113,113)'
  			},
  			purple: {
  				'600': 'rgb(147,51,234)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderColor: {
  			redBorder: 'rgba(234,56,59,.5)',
  			greenBorder: 'rgba(0,194,120,.4)',
  			baseBorderMed: '#cccccc',
  			accentBlue: 'rgb(76,148,255)',
  			baseBorderLight: 'rgb(32,33,39)',
  			baseTextHighEmphasis: 'rgb(244,244,246)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		textColor: {
  			greenPrimaryButtonText: 'rgb(20,21,27)'
  		},
  		animation: {
  			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			fadeInUp: 'fadeInUp 0.6s ease-out forwards'
  		},
  		keyframes: {
  			pulse: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				}
  			},
  			fadeInUp: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		backdropBlur: {
  			xl: '24px'
  		},
  		scale: {
  			'101': '1.01'
  		},
  		fontFamily: {
  			system: [
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI"',
  				'Roboto',
  				'Helvetica Neue"',
  				'Arial',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'monospace'
  			]
  		},
  		transitionDuration: {
  			'200': '200ms',
  			'300': '300ms'
  		},
  		boxShadow: {
  			'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
