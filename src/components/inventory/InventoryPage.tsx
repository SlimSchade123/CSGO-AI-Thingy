import { useInventoryStore } from '@/store/useInventoryStore'
import { useEconomyStore } from '@/store/useEconomyStore'
import { SkinCard } from './SkinCard'
import { InventoryFilters } from './InventoryFilters'
import { formatCredits } from '@/lib/pricing'

export function InventoryPage() {
  const getFilteredItems = useInventoryStore((s) => s.getFilteredItems)
  const sellItem = useInventoryStore((s) => s.sellItem)
  const getTotalValue = useInventoryStore((s) => s.getTotalValue)
  const itemCount = useInventoryStore((s) => s.items.length)
  const earnCredits = useEconomyStore((s) => s.earnCredits)

  const filteredItems = getFilteredItems()
  const totalValue = getTotalValue()

  const handleSell = (instanceId: string) => {
    const earned = sellItem(instanceId)
    if (earned > 0) earnCredits(earned)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2
              className="text-xl font-bold text-text-primary uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Inventory
            </h2>
            <p className="text-sm text-text-secondary">
              <span className="text-text-primary font-semibold">{itemCount}</span> items ·{' '}
              Total value:{' '}
              <span className="text-accent font-semibold">{formatCredits(totalValue)}</span>
            </p>
          </div>
        </div>
        <div className="mt-3">
          <InventoryFilters />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="text-6xl opacity-30">🎒</span>
            <p className="text-text-muted">
              {itemCount === 0
                ? 'Your inventory is empty. Open some cases!'
                : 'No items match your filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredItems.map((item) => (
              <SkinCard key={item.instanceId} item={item} onSell={handleSell} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
