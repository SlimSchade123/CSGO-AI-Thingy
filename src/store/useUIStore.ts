import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ActivePage, InventoryItem, OpenPhase } from '@/types'

interface UIState {
  activePage: ActivePage
  activeCaseId: string | null
  openPhase: OpenPhase
  quickOpenMode: boolean
  pendingItem: InventoryItem | null
  soundEnabled: boolean
}

interface UIActions {
  setPage: (page: ActivePage) => void
  openCase: (caseId: string) => void
  closeCase: () => void
  setOpenPhase: (phase: OpenPhase) => void
  setQuickOpen: (enabled: boolean) => void
  setPendingItem: (item: InventoryItem) => void
  clearPendingItem: () => void
  setSoundEnabled: (enabled: boolean) => void
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      activePage: 'cases',
      activeCaseId: null,
      openPhase: 'idle',
      quickOpenMode: false,
      pendingItem: null,
      soundEnabled: true,

      setPage: (activePage) => set({ activePage }),
      openCase: (caseId) => set({ activeCaseId: caseId, openPhase: 'idle', pendingItem: null }),
      closeCase: () => set({ activeCaseId: null, openPhase: 'idle', pendingItem: null }),
      setOpenPhase: (openPhase) => set({ openPhase }),
      setQuickOpen: (quickOpenMode) => set({ quickOpenMode }),
      setPendingItem: (pendingItem) => set({ pendingItem }),
      clearPendingItem: () => set({ pendingItem: null }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
    }),
    {
      name: 'csgo-sim:ui-prefs',
      partialize: (s) => ({
        quickOpenMode: s.quickOpenMode,
        soundEnabled: s.soundEnabled,
        activePage: s.activePage,
      }),
    }
  )
)
