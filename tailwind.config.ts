import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: ['Fraunces', 'serif'],
				body: ['Inter Variable', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					dim: 'hsl(var(--primary-dim))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					dim: 'hsl(var(--accent-dim))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom constellation colors
				void: 'hsl(var(--void))',
				abyss: 'hsl(var(--abyss))',
				shadow: 'hsl(var(--shadow))',
				obsidian: 'hsl(var(--obsidian))',
				slate: 'hsl(var(--slate))',
				mist: 'hsl(var(--mist))',
				silver: 'hsl(var(--silver))',
				pearl: 'hsl(var(--pearl))',
				cosmic: {
					purple: 'hsl(var(--cosmic-purple))',
					'purple-dim': 'hsl(var(--cosmic-purple-dim))'
				},
				ethereal: {
					blue: 'hsl(var(--ethereal-blue))',
					'blue-dim': 'hsl(var(--ethereal-blue-dim))'
				},
				astral: {
					cyan: 'hsl(var(--astral-cyan))',
					'cyan-dim': 'hsl(var(--astral-cyan-dim))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neural-pulse': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'constellation-drift': {
					'0%': {
						transform: 'translateX(0) translateY(0)'
					},
					'33%': {
						transform: 'translateX(10px) translateY(-5px)'
					},
					'66%': {
						transform: 'translateX(-5px) translateY(10px)'
					},
					'100%': {
						transform: 'translateX(0) translateY(0)'
					}
				},
				'cosmic-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--cosmic-purple) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--cosmic-purple) / 0.6), 0 0 60px hsl(var(--ethereal-blue) / 0.3)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
				'constellation-drift': 'constellation-drift 8s ease-in-out infinite',
				'cosmic-glow': 'cosmic-glow 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
