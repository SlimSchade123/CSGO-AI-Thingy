import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InventoryItem, HistoryRecord, Rarity } from '@/types'
import { RARITY_ORDER } from '@/lib/rarityUtils'

const DAILY_REWARD_CREDITS = 500
const HISTORY_MAX = 100

interface EconomyState {
  balance: number
  totalSpent: number
  totalEarned: number
  casesOpened: number
  rarityDistribution: Record<Rarity, number>
  bestDrop: InventoryItem | null
  history: HistoryRecord[]
  lastDailyClaim: number | null
}

interface EconomyActions {
  spendCredits: (amount: number) => boolean
  earnCredits: (amount: number) => void
  recordOpen: (item: InventoryItem, caseId: string, caseName: string, cost: number) => void
  claimDailyReward: () => void
  clearHistory: () => void
  resetAll: () => void
}

const initialState: EconomyState = {
  balance: 5000,
  totalSpent: 0,
  totalEarned: 0,
  casesOpened: 0,
  rarityDistribution: {
    'mil-spec': 0,
    'restricted': 0,
    'classified': 0,
    'covert': 0,
    'rare-special': 0,
  },
  bestDrop: null,
  history: [],
  lastDailyClaim: null,
}

export const useEconomyStore = create<EconomyState & EconomyActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      spendCredits: (amount) => {
        const { balance } = get()
        if (balance < amount) return false
        set((s) => ({ balance: Math.round((s.balance - amount) * 100) / 100 }))
        return true
      },

      earnCredits: (amount) => {
        set((s) => ({
          balance: Math.round((s.balance + amount) * 100) / 100,
          totalEarned: Math.round((s.totalEarned + amount) * 100) / 100,
        }))
      },

      recordOpen: (item, caseId, caseName, cost) => {
        const record: HistoryRecord = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: Date.now(),
          caseId,
          caseName,
          item,
          spent: cost,
        }
        set((s) => {
          const newDist = { ...s.rarityDistribution }
          newDist[item.skin.rarity] = (newDist[item.skin.rarity] ?? 0) + 1

          const isBetter =
            !s.bestDrop ||
            RARITY_ORDER[item.skin.rarity] > RARITY_ORDER[s.bestDrop.skin.rarity] ||
            (item.skin.rarity === s.bestDrop.skin.rarity && item.price > s.bestDrop.price)

          return {
            casesOpened: s.casesOpened + 1,
            totalSpent: Math.round((s.totalSpent + cost) * 100) / 100,
            rarityDistribution: newDist,
            bestDrop: isBetter ? item : s.bestDrop,
            history: [record, ...s.history].slice(0, HISTORY_MAX),
          }
        })
      },

      claimDailyReward: () => {
        set((s) => ({
          balance: Math.round((s.balance + DAILY_REWARD_CREDITS) * 100) / 100,
          lastDailyClaim: Date.now(),
        }))
      },

      clearHistory: () => set({ history: [] }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'csgo-sim:economy',
    }
  )
)
