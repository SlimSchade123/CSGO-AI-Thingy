import type { SkinDefinition, WearCondition } from '@/types'
import { RARITY_BORDER_CLASSES, RARITY_GLOW_COLORS, RARITY_TEXT_CLASSES } from '@/lib/rarityUtils'

interface ReelItemProps {
  skin: SkinDefinition
  wear?: WearCondition
  isCenter?: boolean
}

// Weapon icon placeholders using gradient backgrounds per rarity
const WEAPON_GRADIENTS: Record<string, string> = {
  Rifle: 'from-slate-700 to-slate-900',
  Pistol: 'from-zinc-700 to-zinc-900',
  SMG: 'from-stone-700 to-stone-900',
  Shotgun: 'from-neutral-700 to-neutral-900',
  Sniper: 'from-gray-700 to-gray-900',
  Knife: 'from-yellow-900 to-amber-950',
  Gloves: 'from-orange-900 to-orange-950',
}

export function ReelItem({ skin, wear, isCenter = false }: ReelItemProps) {
  const borderClass = RARITY_BORDER_CLASSES[skin.rarity]
  const textClass = RARITY_TEXT_CLASSES[skin.rarity]
  const glowColor = RARITY_GLOW_COLORS[skin.rarity]
  const gradClass = WEAPON_GRADIENTS[skin.weaponType] ?? 'from-slate-700 to-slate-900'

  return (
    <div
      className={`relative flex flex-col shrink-0 rounded-md overflow-hidden skin-card-rarity-border ${borderClass}
        transition-transform duration-100 select-none bg-bg-card
        ${isCenter ? 'scale-105' : ''}`}
      style={{
        width: 128,
        height: 160,
        boxShadow: isCenter ? `0 0 18px ${glowColor}60` : undefined,
      }}
    >
      {/* Weapon art area */}
      <div className={`flex-1 bg-gradient-to-br ${gradClass} flex items-center justify-center p-3 relative`}>
        {/* Rarity glow overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at center, ${glowColor}50 0%, transparent 70%)` }}
        />
        {/* Weapon type symbol */}
        <div className="relative text-4xl opacity-60 select-none">
          {skin.weaponType === 'Knife' ? '🔪' :
           skin.weaponType === 'Gloves' ? '🧤' :
           skin.weaponType === 'Sniper' ? '🎯' :
           skin.weaponType === 'Pistol' ? '🔫' :
           '⚡'}
        </div>
      </div>

      {/* Info area */}
      <div className="px-2 py-1.5 bg-bg-primary/80 backdrop-blur-sm">
        <p className="text-[10px] text-text-muted font-medium truncate">{skin.weaponName}</p>
        <p className={`text-[11px] font-semibold truncate leading-tight ${textClass}`}>{skin.skinName}</p>
        {wear && (
          <p className="text-[9px] text-text-muted truncate mt-0.5">{wear}</p>
        )}
      </div>
    </div>
  )
}
