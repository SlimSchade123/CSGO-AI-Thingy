import type { Rarity } from '@/types'
import { RARITY_LABELS, RARITY_TEXT_CLASSES, RARITY_BG_CLASSES } from '@/lib/rarityUtils'

interface BadgeProps {
  rarity: Rarity
  className?: string
}

export function RarityBadge({ rarity, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded uppercase tracking-wide
        ${RARITY_BG_CLASSES[rarity]}/20 ${RARITY_TEXT_CLASSES[rarity]} ${className}`}
    >
      {RARITY_LABELS[rarity]}
    </span>
  )
}
