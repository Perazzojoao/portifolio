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
				'about-subtitle': 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
				'mobile-nav': '0 16px 34px -20px rgba(4, 8, 16, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
				'skill-card': '0 16px 34px -20px rgba(4, 8, 16, 0.95)',
				'skill-card-hover': '0 20px 40px -24px rgba(0, 194, 255, 0.45), 0 18px 26px -24px rgba(0, 0, 0, 0.82)',
				'project-card': '0 20px 38px -24px rgba(0, 0, 0, 0.9)',
				'project-card-hover': '0 20px 40px -22px rgba(0, 194, 255, 0.42), 0 12px 24px -24px rgba(0, 0, 0, 0.9)',
				'contact-cta': '0 0 0 1px rgba(255, 255, 255, 0.08) inset',
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
				'about-subtitle': 'linear-gradient(120deg, rgba(102, 225, 255, 0.16), rgba(47, 107, 255, 0.1))',
				'mobile-nav-dropdown':
					'radial-gradient(circle at 88% 0%, rgba(0, 194, 255, 0.1), transparent 38%), linear-gradient(145deg, rgba(15, 23, 42, 0.28), rgba(15, 23, 42, 0.16))',
				'mobile-nav-item': 'linear-gradient(120deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.06))',
				'mobile-nav-item-highlighted': 'linear-gradient(120deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
				'mobile-nav-item-active':
					'radial-gradient(circle at 90% 0%, rgba(0, 194, 255, 0.14), transparent 60%), linear-gradient(120deg, rgba(47, 107, 255, 0.22), rgba(47, 107, 255, 0.1))',
				'skill-chip': 'linear-gradient(140deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
				'skill-card':
					'radial-gradient(circle at 88% 0%, rgba(0, 194, 255, 0.1), transparent 38%), linear-gradient(145deg, rgba(15, 23, 42, 0.28), rgba(15, 23, 42, 0.16))',
				'skill-row': 'linear-gradient(120deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02))',
				'skill-row-hover': 'linear-gradient(120deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.04))',
				'project-card':
					'radial-gradient(circle at 82% 6%, rgba(0, 194, 255, 0.12), transparent 40%), linear-gradient(145deg, rgba(13, 24, 47, 0.64), rgba(10, 16, 31, 0.58))',
				'project-pill': 'linear-gradient(130deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02))',
				'project-tag': 'linear-gradient(130deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015))',
				'contact-shell':
					'radial-gradient(circle at 90% 0%, rgba(0, 194, 255, 0.12), transparent 38%), linear-gradient(145deg, rgba(14, 28, 56, 0.5), rgba(11, 18, 34, 0.42))',
				'text-gradient': 'linear-gradient(120deg, #8ec9ff 0%, #45a3ff 48%, #82efff 100%)',
			},
		},
	},
}

export default config
