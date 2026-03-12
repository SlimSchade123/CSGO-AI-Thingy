import type { HistoryRecord } from '@/types'
import { RARITY_TEXT_CLASSES, RARITY_LABELS } from '@/lib/rarityUtils'
import { formatCredits } from '@/lib/pricing'

interface HistoryEntryProps {
  record: HistoryRecord
  index: number
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const s = Math.floor(diff / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  if (m > 0) return `${m}m ago`
  return `${s}s ago`
}

export function HistoryEntry({ record, index }: HistoryEntryProps) {
  const { item } = record
  const textClass = RARITY_TEXT_CLASSES[item.skin.rarity]

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 text-sm
        ${index % 2 === 0 ? 'bg-bg-card' : 'bg-bg-primary'}`}
    >
      {/* Weapon icon */}
      <span className="text-lg w-6 text-center shrink-0">
        {item.skin.weaponType === 'Knife' ? '🔪' :
         item.skin.weaponType === 'Gloves' ? '🧤' :
         item.skin.weaponType === 'Sniper' ? '🎯' :
         item.skin.weaponType === 'Pistol' ? '🔫' :
         '⚡'}
      </span>

      {/* Skin info */}
      <div className="flex-1 min-w-0">
        <span className={`font-semibold ${textClass} truncate block`}>
          {item.skin.weaponName} | {item.skin.skinName}
        </span>
        <span className="text-text-muted text-xs">{item.wear}</span>
      </div>

      {/* Rarity badge */}
      <span className={`text-xs font-medium hidden sm:block shrink-0 ${textClass}`}>
        {RARITY_LABELS[item.skin.rarity]}
      </span>

      {/* Case */}
      <span className="text-text-muted text-xs hidden md:block shrink-0 max-w-28 truncate">
        {record.caseName}
      </span>

      {/* Price */}
      <span className="text-accent font-bold tabular-nums shrink-0">
        {formatCredits(item.price)}
      </span>

      {/* Time */}
      <span className="text-text-muted text-xs shrink-0 w-14 text-right">
        {timeAgo(record.timestamp)}
      </span>
    </div>
  )
}
