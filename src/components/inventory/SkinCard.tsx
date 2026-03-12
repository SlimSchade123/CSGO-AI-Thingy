import { useState } from 'react'
import type { InventoryItem } from '@/types'
import { RARITY_BORDER_CLASSES, RARITY_GLOW_COLORS, RARITY_TEXT_CLASSES } from '@/lib/rarityUtils'
import { formatCredits, computeSellPrice } from '@/lib/pricing'

interface SkinCardProps {
  item: InventoryItem
  onSell?: (instanceId: string) => void
}

export function SkinCard({ item, onSell }: SkinCardProps) {
  const [hovered, setHovered] = useState(false)

  const borderClass = RARITY_BORDER_CLASSES[item.skin.rarity]
  const textClass = RARITY_TEXT_CLASSES[item.skin.rarity]
  const glowColor = RARITY_GLOW_COLORS[item.skin.rarity]
  const sellPrice = computeSellPrice(item.price)

  return (
    <div
      className={`relative rounded-lg overflow-hidden border-2 flex flex-col bg-bg-card transition-all duration-150 ${borderClass}
        ${hovered ? 'scale-[1.03]' : ''}`}
      style={{
        boxShadow: hovered ? `0 0 14px ${glowColor}50` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Art area */}
      <div
        className="aspect-[4/3] flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}20 0%, #13131a 80%)`,
        }}
      >
        <div className="text-4xl select-none">
          {item.skin.weaponType === 'Knife' ? '🔪' :
           item.skin.weaponType === 'Gloves' ? '🧤' :
           item.skin.weaponType === 'Sniper' ? '🎯' :
           item.skin.weaponType === 'Pistol' ? '🔫' :
           '⚡'}
        </div>

        {/* Sell overlay on hover */}
        {hovered && onSell && (
          <div className="absolute inset-0 bg-bg-primary/80 flex items-center justify-center">
            <button
              onClick={() => onSell(item.instanceId)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-accent hover:bg-accent-hover transition-colors cursor-pointer active:scale-95"
            >
              Sell {formatCredits(sellPrice)}
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-0.5">
        <p className="text-[10px] text-text-muted truncate">{item.skin.weaponName}</p>
        <p className={`text-xs font-semibold truncate ${textClass}`}>{item.skin.skinName}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-text-muted">{item.wear}</span>
          <span className="text-xs font-bold text-accent">{formatCredits(item.price)}</span>
        </div>
      </div>
    </div>
  )
}
