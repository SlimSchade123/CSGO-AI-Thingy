import { useEffect, useState } from 'react'
import { useUIStore } from '@/store/useUIStore'
import { useEconomyStore } from '@/store/useEconomyStore'
import { getCaseById } from '@/data/cases'
import { useOpenCase } from '@/hooks/useOpenCase'
import { SpinReel } from '@/components/reel/SpinReel'
import { RevealOverlay } from '@/components/reel/RevealOverlay'
import { REEL_CONFIG } from '@/lib/animation'
import { formatCredits } from '@/lib/pricing'
import type { InventoryItem } from '@/types'

export function OpenCaseModal() {
  const activeCaseId = useUIStore((s) => s.activeCaseId)
  const quickOpenMode = useUIStore((s) => s.quickOpenMode)
  const setQuickOpen = useUIStore((s) => s.setQuickOpen)
  const soundEnabled = useUIStore((s) => s.soundEnabled)
  const setSoundEnabled = useUIStore((s) => s.setSoundEnabled)
  const pendingItem = useUIStore((s) => s.pendingItem)
  const balance = useEconomyStore((s) => s.balance)

  const { openPhase, startOpen, onSpinComplete, collectItem, openAnother, closeCase } = useOpenCase()
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null)

  const caseData = activeCaseId ? getCaseById(activeCaseId) : null
  const canAfford = caseData ? balance >= caseData.cost : false

  // Sync pendingItem to local state for reel
  useEffect(() => {
    if (pendingItem) setCurrentItem(pendingItem)
  }, [pendingItem])

  const handleOpen = () => {
    startOpen()
  }

  if (!activeCaseId || !caseData) return null

  const spinDuration = quickOpenMode
    ? REEL_CONFIG.QUICK_SPIN_DURATION_MS
    : REEL_CONFIG.SPIN_DURATION_MS

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg-primary/95 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            {caseData.name}
          </h2>
          <p className="text-sm text-text-secondary">
            Cost: <span className="text-accent font-semibold">{formatCredits(caseData.cost)}</span>
            {' · '}
            Balance: <span className="text-text-primary font-semibold">{formatCredits(balance)}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Settings */}
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={quickOpenMode}
                onChange={(e) => setQuickOpen(e.target.checked)}
                className="rounded accent-yellow-400"
              />
              Quick Open
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="rounded accent-yellow-400"
              />
              Sound
            </label>
          </div>
          <button
            onClick={closeCase}
            className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
        {/* Idle phase */}
        {openPhase === 'idle' && (
          <div className="flex flex-col items-center gap-6 animate-slide-up" style={{ animation: 'slide-up 0.3s ease-out' }}>
            <div className="text-center">
              <p className="text-text-secondary text-sm mb-2">{caseData.description}</p>
              <p className="text-4xl mb-4">📦</p>
            </div>
            {!canAfford && (
              <p className="text-rarity-covert text-sm font-medium">
                Insufficient balance — need {formatCredits(caseData.cost)}
              </p>
            )}
            <button
              onClick={handleOpen}
              disabled={!canAfford}
              className={`px-10 py-3.5 rounded-xl text-lg font-bold uppercase tracking-wide transition-all duration-150 cursor-pointer select-none
                ${canAfford
                  ? 'bg-accent text-bg-primary hover:bg-accent-hover active:scale-95 shadow-lg shadow-accent/30'
                  : 'bg-bg-elevated text-text-muted cursor-not-allowed opacity-50'
                }`}
            >
              Open Case — {formatCredits(caseData.cost)}
            </button>
          </div>
        )}

        {/* Spinning phase */}
        {openPhase === 'spinning' && currentItem && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-text-secondary text-sm uppercase tracking-widest animate-pulse">
              Opening...
            </p>
            <SpinReel
              caseId={activeCaseId}
              targetItem={currentItem}
              duration={spinDuration}
              onComplete={onSpinComplete}
            />
          </div>
        )}

        {/* Revealing phase */}
        {openPhase === 'revealing' && currentItem && (
          <RevealOverlay
            item={currentItem}
            onCollect={collectItem}
            onOpenAnother={openAnother}
            canOpenAnother={canAfford}
          />
        )}

        {/* Done phase — happens briefly before idle reset */}
        {openPhase === 'done' && currentItem && (
          <RevealOverlay
            item={currentItem}
            onCollect={() => {}}
            onOpenAnother={openAnother}
            canOpenAnother={canAfford}
          />
        )}
      </div>

      {/* Skin pool preview at bottom */}
      {openPhase === 'idle' && (
        <div className="px-6 py-4 border-t border-border shrink-0">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Contains</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {caseData.skins.map((skin) => (
              <div
                key={skin.id}
                className="shrink-0 px-2 py-1 rounded text-xs font-medium border"
                style={{
                  borderColor: `${('mil-spec' === skin.rarity ? '#4b69ff' : 'restricted' === skin.rarity ? '#8847ff' : 'classified' === skin.rarity ? '#d32ce6' : 'covert' === skin.rarity ? '#eb4b4b' : '#e4ae39')}60`,
                  color: 'mil-spec' === skin.rarity ? '#4b69ff' : 'restricted' === skin.rarity ? '#8847ff' : 'classified' === skin.rarity ? '#d32ce6' : 'covert' === skin.rarity ? '#eb4b4b' : '#e4ae39',
                  backgroundColor: `${'mil-spec' === skin.rarity ? '#4b69ff' : 'restricted' === skin.rarity ? '#8847ff' : 'classified' === skin.rarity ? '#d32ce6' : 'covert' === skin.rarity ? '#eb4b4b' : '#e4ae39'}15`,
                }}
              >
                {skin.weaponName} | {skin.skinName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
