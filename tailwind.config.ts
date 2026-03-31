import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './messages/**/*.{json}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				surface: 'var(--surface)',
				foreground: 'var(--foreground)',
				muted: 'var(--muted)',
				'muted-foreground': 'var(--muted-foreground)',
				primary: 'var(--primary)',
				'primary-hover': 'var(--primary-hover)',
				'primary-foreground': 'var(--primary-foreground)',
				secondary: 'var(--secondary)',
				'secondary-foreground': 'var(--secondary-foreground)',
				accent: 'var(--accent)',
				'accent-foreground': 'var(--accent-foreground)',
				destructive: 'var(--destructive)',
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				card: 'var(--card)',
				'card-foreground': 'var(--card-foreground)',
				popover: 'var(--popover)',
				'popover-foreground': 'var(--popover-foreground)',
				sidebar: 'var(--sidebar)',
				'sidebar-foreground': 'var(--sidebar-foreground)',
				'sidebar-primary': 'var(--sidebar-primary)',
				'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
				'sidebar-accent': 'var(--sidebar-accent)',
				'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
				'sidebar-border': 'var(--sidebar-border)',
				'sidebar-ring': 'var(--sidebar-ring)',
				'chart-1': 'var(--chart-1)',
				'chart-2': 'var(--chart-2)',
				'chart-3': 'var(--chart-3)',
				'chart-4': 'var(--chart-4)',
				'chart-5': 'var(--chart-5)',
			},
			borderRadius: {
				sm: 'calc(var(--radius) * 0.6)',
				md: 'calc(var(--radius) * 0.8)',
				lg: 'var(--radius)',
				xl: 'calc(var(--radius) * 1.4)',
				'2xl': 'calc(var(--radius) * 1.8)',
				'3xl': 'calc(var(--radius) * 2.2)',
				'4xl': 'calc(var(--radius) * 2.6)',
			},
			boxShadow: {
				card: 'var(--card-shadow)',
				'blue-glow': 'var(--blue-glow)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
				heading: ['var(--font-sans)', 'sans-serif'],
			},
			maxWidth: {
				section: '1120px',
			},
			backdropBlur: {
				18: '18px',
				20: '20px',
				22: '22px',
			},
			backgroundImage: {
				atmosphere:
					'radial-gradient(circle at 16% 10%, rgba(47, 107, 255, 0.25), transparent 30%), radial-gradient(circle at 82% 18%, rgba(0, 194, 255, 0.2), transparent 24%), radial-gradient(circle at 70% 82%, rgba(47, 107, 255, 0.24), transparent 30%), linear-gradient(160deg, #06080f 10%, #081225 55%, #06080f 100%)',
				'organic-about':
					'radial-gradient(circle at 15% 0%, rgba(102, 225, 255, 0.08), transparent 34%), linear-gradient(145deg, rgba(14, 28, 55, 0.68) 10%, rgba(10, 16, 33, 0.62) 100%)',
				'organic-stack':
					'radial-gradient(circle at 85% 5%, rgba(47, 107, 255, 0.14), transparent 36%), linear-gradient(150deg, rgba(9, 17, 34, 0.74), rgba(8, 14, 30, 0.62))',
				'text-gradient': 'linear-gradient(120deg, #8ec9ff 0%, #45a3ff 48%, #82efff 100%)',
			},
		},
	},
}

export default config
