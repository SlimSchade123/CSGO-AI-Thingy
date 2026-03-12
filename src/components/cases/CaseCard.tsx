import type { CaseDefinition } from '@/types'
import { useUIStore } from '@/store/useUIStore'
import { useEconomyStore } from '@/store/useEconomyStore'
import { formatCredits } from '@/lib/pricing'

interface CaseCardProps {
  caseData: CaseDefinition
}

const RARITY_COUNTS = (skins: CaseDefinition['skins']) => {
  const counts = { 'mil-spec': 0, 'restricted': 0, 'classified': 0, 'covert': 0, 'rare-special': 0 }
  skins.forEach((s) => { counts[s.rarity]++ })
  return counts
}

export function CaseCard({ caseData }: CaseCardProps) {
  const openCase = useUIStore((s) => s.openCase)
  const balance = useEconomyStore((s) => s.balance)
  const canAfford = balance >= caseData.cost

  const counts = RARITY_COUNTS(caseData.skins)

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-border hover:border-border-hover transition-all duration-200 bg-bg-card flex flex-col cursor-pointer group hover:scale-[1.02]"
      style={{ boxShadow: `0 0 0 1px ${caseData.accentColor}20` }}
      onClick={() => openCase(caseData.id)}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ background: caseData.accentColor }} />

      {/* Case art */}
      <div
        className="aspect-[4/3] flex items-center justify-center text-7xl relative"
        style={{
          background: `radial-gradient(circle at center, ${caseData.accentColor}20 0%, #13131a 70%)`,
        }}
      >
        📦
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${caseData.accentColor}15 0%, transparent 70%)` }}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="font-bold text-text-primary text-lg leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {caseData.name}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">{caseData.description}</p>
        </div>

        {/* Rarity bar */}
        <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden">
          {counts['mil-spec'] > 0 && (
            <div className="bg-rarity-mil-spec" style={{ flex: counts['mil-spec'] }} />
          )}
          {counts['restricted'] > 0 && (
            <div className="bg-rarity-restricted" style={{ flex: counts['restricted'] }} />
          )}
          {counts['classified'] > 0 && (
            <div className="bg-rarity-classified" style={{ flex: counts['classified'] }} />
          )}
          {counts['covert'] > 0 && (
            <div className="bg-rarity-covert" style={{ flex: counts['covert'] }} />
          )}
          {counts['rare-special'] > 0 && (
            <div className="bg-rarity-special" style={{ flex: counts['rare-special'] }} />
          )}
        </div>

        {/* Open button */}
        <button
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 active:scale-95
            ${canAfford
              ? 'text-bg-primary cursor-pointer'
              : 'text-text-muted bg-bg-elevated border border-border cursor-not-allowed opacity-60'
            }`}
          style={canAfford ? { backgroundColor: caseData.accentColor } : {}}
          onClick={(e) => {
            e.stopPropagation()
            openCase(caseData.id)
          }}
        >
          Open — {formatCredits(caseData.cost)}
        </button>
      </div>
    </div>
  )
}
