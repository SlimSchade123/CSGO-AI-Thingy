import { useCallback } from 'react'
import { useEconomyStore } from '@/store/useEconomyStore'
import { useInventoryStore } from '@/store/useInventoryStore'
import { useUIStore } from '@/store/useUIStore'
import { getCaseById } from '@/data/cases'
import { rollRarity, rollSkin, rollWear, generateInstanceId } from '@/lib/rng'
import { computePrice } from '@/lib/pricing'
import type { InventoryItem, SkinDefinition } from '@/types'

export function useOpenCase() {
  const spendCredits = useEconomyStore((s) => s.spendCredits)
  const recordOpen = useEconomyStore((s) => s.recordOpen)
  const addItem = useInventoryStore((s) => s.addItem)
  const { openPhase, activeCaseId, quickOpenMode, setOpenPhase, setPendingItem, closeCase } =
    useUIStore()

  const startOpen = useCallback((): InventoryItem | null => {
    if (!activeCaseId) return null
    const caseData = getCaseById(activeCaseId)
    if (!caseData) return null

    const success = spendCredits(caseData.cost)
    if (!success) return null

    const rarity = rollRarity()
    const skin: SkinDefinition = rollSkin(caseData.skins, rarity)
    const wear = rollWear()
    const price = computePrice(skin.basePrice, wear)

    const item: InventoryItem = {
      instanceId: generateInstanceId(),
      skin,
      wear,
      price,
      acquiredAt: Date.now(),
      caseId: activeCaseId,
    }

    setOpenPhase('spinning')
    setPendingItem(item)
    return item
  }, [activeCaseId, spendCredits, setOpenPhase, setPendingItem])

  const onSpinComplete = useCallback(() => {
    setOpenPhase('revealing')
  }, [setOpenPhase])

  const collectItem = useCallback(() => {
    const { pendingItem, activeCaseId: cid } = useUIStore.getState()
    if (!pendingItem || !cid) return

    const caseData = getCaseById(cid)
    addItem(pendingItem)
    recordOpen(pendingItem, cid, caseData?.name ?? cid, caseData?.cost ?? 0)
    setOpenPhase('done')
  }, [addItem, recordOpen, setOpenPhase])

  const openAnother = useCallback(() => {
    setOpenPhase('idle')
    useUIStore.getState().clearPendingItem()
  }, [setOpenPhase])

  return {
    openPhase,
    quickOpenMode,
    startOpen,
    onSpinComplete,
    collectItem,
    openAnother,
    closeCase,
  }
}
