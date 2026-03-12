import { useEffect, useState } from 'react'
import { CASES } from '@/data/cases'
import { CaseCard } from './CaseCard'
import { useDailyCase } from '@/hooks/useDailyCase'
import { formatCredits } from '@/lib/pricing'

export function CasesPage() {
  const { isAvailable, countdown, progressPercent, claim } = useDailyCase()
  const [, forceUpdate] = useState(0)

  // Update countdown every second
  useEffect(() => {
    if (isAvailable) return
    const id = setInterval(() => forceUpdate((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [isAvailable])

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto flex-1">
      {/* Daily free case banner */}
      <div
        className={`rounded-xl p-4 border flex items-center justify-between gap-4
          ${isAvailable
            ? 'bg-green-950/30 border-green-600/40'
            : 'bg-bg-card border-border'
          }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isAvailable ? '🎁' : '⏳'}</span>
          <div>
            <p className="font-semibold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              {isAvailable ? 'Daily Reward Available!' : 'Daily Reward'}
            </p>
            <p className="text-xs text-text-secondary">
              {isAvailable
                ? `Claim ${formatCredits(500)} free credits`
                : `Next reward in ${countdown}`}
            </p>
          </div>
        </div>

        {isAvailable ? (
          <button
            onClick={claim}
            className="px-4 py-2 rounded-lg font-semibold text-sm text-black bg-green-400 hover:bg-green-300 transition-colors cursor-pointer active:scale-95 shrink-0"
          >
            Claim {formatCredits(500)}
          </button>
        ) : (
          <div className="flex flex-col items-end gap-1 shrink-0 min-w-24">
            <span className="text-xs text-text-muted">{Math.round(progressPercent)}%</span>
            <div className="w-24 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Cases grid */}
      <div>
        <h2
          className="text-lg font-bold text-text-primary mb-4 uppercase tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Available Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASES.map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>
      </div>

      {/* Rarity odds */}
      <div className="rounded-xl bg-bg-card border border-border p-4">
        <h3
          className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Drop Rates
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { label: 'Mil-Spec', color: '#4b69ff', pct: '79.92%' },
            { label: 'Restricted', color: '#8847ff', pct: '15.98%' },
            { label: 'Classified', color: '#d32ce6', pct: '3.20%' },
            { label: 'Covert', color: '#eb4b4b', pct: '0.64%' },
            { label: 'Rare Special', color: '#e4ae39', pct: '0.26%' },
          ].map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-bg-primary">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
              <span className="text-text-muted">{r.label}</span>
              <span className="font-bold" style={{ color: r.color }}>{r.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
