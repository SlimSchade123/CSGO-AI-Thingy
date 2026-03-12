import { useEconomyStore } from '@/store/useEconomyStore'
import { HistoryEntry } from './HistoryEntry'

export function HistoryPage() {
  const history = useEconomyStore((s) => s.history)
  const clearHistory = useEconomyStore((s) => s.clearHistory)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-bold text-text-primary uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Opening History
          </h2>
          <p className="text-sm text-text-secondary">
            Last <span className="text-text-primary font-semibold">{history.length}</span> openings
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Clear all history?')) clearHistory()
            }}
            className="text-xs text-text-muted hover:text-rarity-covert transition-colors cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Column headers */}
      {history.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 text-xs text-text-muted uppercase tracking-widest border-b border-border shrink-0">
          <span className="w-6" />
          <span className="flex-1">Item</span>
          <span className="hidden sm:block shrink-0 w-24">Rarity</span>
          <span className="hidden md:block shrink-0 w-28">Case</span>
          <span className="shrink-0 w-16 text-right">Value</span>
          <span className="shrink-0 w-14 text-right">Time</span>
        </div>
      )}

      {/* Entries */}
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <span className="text-6xl opacity-30">📜</span>
            <p className="text-text-muted">No history yet. Open some cases!</p>
          </div>
        ) : (
          history.map((record, i) => (
            <HistoryEntry key={record.id} record={record} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
