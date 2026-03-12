import { useEconomyStore } from '@/store/useEconomyStore'
import { formatCredits } from '@/lib/pricing'

export function BalanceBar() {
  const balance = useEconomyStore((s) => s.balance)
  const casesOpened = useEconomyStore((s) => s.casesOpened)

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border-b border-border shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-text-muted text-xs uppercase tracking-widest font-medium">Balance</span>
        <span
          className="font-display text-xl font-bold text-accent tabular-nums"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {formatCredits(balance)}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs text-text-secondary">
        <span>
          <span className="text-text-muted">Cases Opened: </span>
          <span className="text-text-primary font-semibold">{casesOpened.toLocaleString()}</span>
        </span>
      </div>
    </div>
  )
}
