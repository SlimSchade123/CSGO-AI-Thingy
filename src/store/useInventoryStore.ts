import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InventoryItem, FilterState, Rarity, WearCondition, WeaponType } from '@/types'
import { RARITY_ORDER } from '@/lib/rarityUtils'
import { computeSellPrice } from '@/lib/pricing'

const WEAR_ORDER: Record<WearCondition, number> = {
  'Factory New': 0,
  'Minimal Wear': 1,
  'Field-Tested': 2,
  'Well-Worn': 3,
  'Battle-Scarred': 4,
}

const defaultFilters: FilterState = {
  rarity: 'all',
  wear: 'all',
  weaponType: 'all',
  sortBy: 'newest',
}

interface InventoryStoreState {
  items: InventoryItem[]
  filters: FilterState
}

interface InventoryStoreActions {
  addItem: (item: InventoryItem) => void
  sellItem: (instanceId: string) => number
  setFilters: (partial: Partial<FilterState>) => void
  resetFilters: () => void
  getFilteredItems: () => InventoryItem[]
  getTotalValue: () => number
}

export const useInventoryStore = create<InventoryStoreState & InventoryStoreActions>()(
  persist(
    (set, get) => ({
      items: [],
      filters: defaultFilters,

      addItem: (item) => set((s) => ({ items: [item, ...s.items] })),

      sellItem: (instanceId) => {
        const { items } = get()
        const item = items.find((i) => i.instanceId === instanceId)
        if (!item) return 0
        const sellPrice = computeSellPrice(item.price)
        set((s) => ({ items: s.items.filter((i) => i.instanceId !== instanceId) }))
        return sellPrice
      },

      setFilters: (partial) =>
        set((s) => ({ filters: { ...s.filters, ...partial } })),

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredItems: () => {
        const { items, filters } = get()
        let filtered = [...items]

        if (filters.rarity !== 'all') {
          filtered = filtered.filter((i) => i.skin.rarity === (filters.rarity as Rarity))
        }
        if (filters.wear !== 'all') {
          filtered = filtered.filter((i) => i.wear === (filters.wear as WearCondition))
        }
        if (filters.weaponType !== 'all') {
          filtered = filtered.filter((i) => i.skin.weaponType === (filters.weaponType as WeaponType))
        }

        switch (filters.sortBy) {
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'rarity':
            filtered.sort((a, b) => RARITY_ORDER[b.skin.rarity] - RARITY_ORDER[a.skin.rarity])
            break
          case 'wear':
            filtered.sort((a, b) => WEAR_ORDER[a.wear] - WEAR_ORDER[b.wear])
            break
          case 'newest':
          default:
            filtered.sort((a, b) => b.acquiredAt - a.acquiredAt)
        }

        return filtered
      },

      getTotalValue: () => {
        const { items } = get()
        return Math.round(items.reduce((sum, i) => sum + i.price, 0) * 100) / 100
      },
    }),
    {
      name: 'csgo-sim:inventory',
      partialize: (s) => ({ items: s.items }),
    }
  )
)
