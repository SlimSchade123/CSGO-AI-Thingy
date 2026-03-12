import { useEconomyStore } from '@/store/useEconomyStore'
import { useInventoryStore } from '@/store/useInventoryStore'
import { StatPanel } from './StatPanel'
import { RarityDonut } from './RarityDonut'
import { formatCredits } from '@/lib/pricing'
import { RARITY_TEXT_CLASSES } from '@/lib/rarityUtils'

export function StatsPage() {
  const balance = useEconomyStore((s) => s.balance)
  const totalSpent = useEconomyStore((s) => s.totalSpent)
  const totalEarned = useEconomyStore((s) => s.totalEarned)
  const casesOpened = useEconomyStore((s) => s.casesOpened)
  const rarityDistribution = useEconomyStore((s) => s.rarityDistribution)
  const bestDrop = useEconomyStore((s) => s.bestDrop)
  const resetAll = useEconomyStore((s) => s.resetAll)
  const clearInventory = useInventoryStore((s) => s.items)

  const netPL = totalEarned - totalSpent
  const netColor = netPL >= 0 ? '#4ade80' : '#ef4444'

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto flex-1">
      <h2
        className="text-xl font-bold text-text-primary uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Statistics
      </h2>

      {/* Economy panels */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatPanel label="Current Balance" value={formatCredits(balance)} color="#e4ae39" />
        <StatPanel label="Cases Opened" value={casesOpened.toLocaleString()} />
        <StatPanel label="Total Spent" value={formatCredits(totalSpent)} color="#ef4444" />
        <StatPanel label="Total Earned" value={formatCredits(totalEarned)} color="#4ade80" />
        <StatPanel
          label="Net P/L"
          value={formatCredits(Math.abs(netPL))}
          subtext={netPL >= 0 ? 'profit' : 'loss'}
          color={netColor}
        />
      </div>

      {/* Best drop */}
      <div className="bg-bg-card rounded-xl border border-border p-4">
        <h3
          className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Best Drop
        </h3>
        {bestDrop ? (
          <div className="flex items-center gap-4">
            <span className="text-3xl">
              {bestDrop.skin.weaponType === 'Knife' ? '🔪' :
               bestDrop.skin.weaponType === 'Gloves' ? '🧤' : '⚡'}
            </span>
            <div>
              <p className={`font-bold text-lg ${RARITY_TEXT_CLASSES[bestDrop.skin.rarity]}`}
                style={{ fontFamily: 'var(--font-display)' }}>
                {bestDrop.skin.weaponName} | {bestDrop.skin.skinName}
              </p>
              <p className="text-sm text-text-secondary">
                {bestDrop.wear} · <span className="text-accent font-semibold">{formatCredits(bestDrop.price)}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-text-muted text-sm">Open some cases to see your best drop!</p>
        )}
      </div>

      {/* Rarity distribution chart */}
      <div className="bg-bg-card rounded-xl border border-border p-4">
        <h3
          className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Rarity Distribution
        </h3>
        <RarityDonut distribution={rarityDistribution} />
      </div>

      {/* Inventory snapshot */}
      <div className="bg-bg-card rounded-xl border border-border p-4">
        <h3
          className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Inventory Snapshot
        </h3>
        <p className="text-text-secondary text-sm">
          <span className="text-text-primary font-semibold">{clearInventory.length}</span> items in inventory
        </p>
      </div>

      {/* Danger zone */}
      <div className="bg-rarity-covert/10 rounded-xl border border-rarity-covert/30 p-4">
        <h3
          className="text-sm font-bold text-rarity-covert uppercase tracking-widest mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Reset
        </h3>
        <p className="text-sm text-text-secondary mb-3">
          Reset all stats, balance, and history. This cannot be undone.
        </p>
        <button
          onClick={() => {
            if (confirm('Reset all data? This cannot be undone.')) {
              resetAll()
              useInventoryStore.getState().items.forEach(() => {})
              // Reset inventory too
              useInventoryStore.setState({ items: [] })
            }
          }}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-rarity-covert border border-rarity-covert/50 hover:bg-rarity-covert/20 transition-colors cursor-pointer"
        >
          Reset All Data
        </button>
      </div>
    </div>
  )
}
