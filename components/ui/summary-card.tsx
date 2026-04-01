import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SummaryCardProps = {
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  bodyClassName?: string
}

export function SummaryCard({
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
  bodyClassName,
}: SummaryCardProps) {
  return (
    <article
      className={cn(
        'rounded-3xl border border-[var(--glass-border)] bg-organic-stack p-5 shadow-card backdrop-blur-20 md:p-6',
        className,
      )}
    >
      <p className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-accent/90', titleClassName)}>{title}</p>
      {subtitle ? <p className={cn('mt-2 text-sm text-foreground/78', subtitleClassName)}>{subtitle}</p> : null}
      <div className={cn('mt-4', bodyClassName)}>{children}</div>
    </article>
  )
}