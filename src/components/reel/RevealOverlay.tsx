import { useEffect, useState } from 'react'
import type { InventoryItem } from '@/types'
import { RARITY_GLOW_COLORS, RARITY_LABELS, RARITY_TEXT_CLASSES } from '@/lib/rarityUtils'
import { formatCredits } from '@/lib/pricing'
import { useSound } from '@/hooks/useSound'

interface RevealOverlayProps {
  item: InventoryItem
  onCollect: () => void
  onOpenAnother: () => void
  canOpenAnother: boolean
}

export function RevealOverlay({ item, onCollect, onOpenAnother, canOpenAnother }: RevealOverlayProps) {
  const [showFlash, setShowFlash] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const { playReveal } = useSound()

  const isHighValue = item.skin.rarity === 'covert' || item.skin.rarity === 'rare-special'
  const glowColor = RARITY_GLOW_COLORS[item.skin.rarity]

  useEffect(() => {
    playReveal(item.skin.rarity)
    if (isHighValue) {
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 700)
    }
    setTimeout(() => setShowCard(true), 100)
  }, [item.instanceId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Screen flash for high-value drops */}
      {showFlash && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            backgroundColor: glowColor,
            animation: 'screen-flash 0.7s ease-out forwards',
          }}
        />
      )}

      {/* Result card */}
      <div
        className={`flex flex-col items-center gap-3 transition-all duration-500 ${
          showCard ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        {/* Rarity label */}
        <p
          className={`text-sm font-bold uppercase tracking-widest ${RARITY_TEXT_CLASSES[item.skin.rarity]}`}
        >
          {RARITY_LABELS[item.skin.rarity]}
        </p>

        {/* Main item card */}
        <div
          className="relative rounded-xl overflow-hidden border-2 flex flex-col"
          style={{
            width: 200,
            height: 260,
            borderColor: glowColor,
            boxShadow: `0 0 30px ${glowColor}80, 0 0 60px ${glowColor}40`,
            animation: isHighValue ? 'glow-pulse 1.8s ease-in-out infinite' : undefined,
            '--glow-color': glowColor,
          } as React.CSSProperties}
        >
          {/* Art area */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at center, ${glowColor}30 0%, #13131a 70%)`,
            }}
          >
            <div className="text-7xl select-none">
              {item.skin.weaponType === 'Knife' ? '🔪' :
               item.skin.weaponType === 'Gloves' ? '🧤' :
               item.skin.weaponType === 'Sniper' ? '🎯' :
               item.skin.weaponType === 'Pistol' ? '🔫' :
               '⚡'}
            </div>
          </div>

          {/* Info */}
          <div className="p-3 bg-bg-primary/90">
            <p className="text-xs text-text-muted">{item.skin.weaponName}</p>
            <p className="font-bold text-text-primary leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {item.skin.skinName}
            </p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs text-text-muted">{item.wear}</span>
              <span className="text-sm font-bold text-accent">{formatCredits(item.price)}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {showCard && (
          <div className="flex gap-3 mt-2 animate-fade-in" style={{ animation: 'fade-in 0.4s ease-out 0.3s both' }}>
            <button
              onClick={onCollect}
              className="px-6 py-2.5 rounded-lg font-semibold text-bg-primary bg-accent hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Add to Inventory
            </button>
            {canOpenAnother && (
              <button
                onClick={onOpenAnother}
                className="px-6 py-2.5 rounded-lg font-semibold text-text-primary bg-bg-elevated border border-border hover:bg-bg-hover transition-colors cursor-pointer"
              >
                Open Another
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
