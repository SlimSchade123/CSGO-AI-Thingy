import type { Rarity } from '@/types'
import { RARITY_LABELS, RARITY_GLOW_COLORS } from '@/lib/rarityUtils'

interface RarityDonutProps {
  distribution: Record<Rarity, number>
}

const RARITY_ORDER: Rarity[] = ['mil-spec', 'restricted', 'classified', 'covert', 'rare-special']

export function RarityDonut({ distribution }: RarityDonutProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0)

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-muted text-sm">
        No data yet — open some cases!
      </div>
    )
  }

  const cx = 80
  const cy = 80
  const r = 60
  const innerR = 38
  let cumulativeAngle = -Math.PI / 2

  const segments = RARITY_ORDER
    .filter((rarity) => distribution[rarity] > 0)
    .map((rarity) => {
      const fraction = distribution[rarity] / total
      const angle = fraction * 2 * Math.PI
      const startAngle = cumulativeAngle
      cumulativeAngle += angle

      const x1 = cx + r * Math.cos(startAngle)
      const y1 = cy + r * Math.sin(startAngle)
      const x2 = cx + r * Math.cos(cumulativeAngle)
      const y2 = cy + r * Math.sin(cumulativeAngle)

      const xi1 = cx + innerR * Math.cos(startAngle)
      const yi1 = cy + innerR * Math.sin(startAngle)
      const xi2 = cx + innerR * Math.cos(cumulativeAngle)
      const yi2 = cy + innerR * Math.sin(cumulativeAngle)

      const largeArcFlag = angle > Math.PI ? 1 : 0

      const d = [
        `M ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${xi2} ${yi2}`,
        `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${xi1} ${yi1}`,
        'Z',
      ].join(' ')

      return { rarity, d, fraction, count: distribution[rarity] }
    })

  // When only one rarity exists the arc start/end points are identical → degenerate path.
  // Use concentric circles instead.
  const isSingleSegment = segments.length === 1

  return (
    <div className="flex items-center gap-6 flex-wrap">
      {/* SVG donut */}
      <svg width={160} height={160} viewBox="0 0 160 160">
        {isSingleSegment ? (
          <>
            <circle cx={cx} cy={cy} r={r} fill={RARITY_GLOW_COLORS[segments[0].rarity]} opacity={0.85} />
            <circle cx={cx} cy={cy} r={innerR} fill="#0a0a0f" />
          </>
        ) : (
          segments.map((seg) => (
            <path
              key={seg.rarity}
              d={seg.d}
              fill={RARITY_GLOW_COLORS[seg.rarity]}
              opacity={0.85}
              stroke="#0a0a0f"
              strokeWidth={2}
            />
          ))
        )}
        {/* Center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#e8e8e8" fontSize="18" fontWeight="bold">
          {total}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#8e8e9a" fontSize="9">
          TOTAL OPENS
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {segments.map((seg) => (
          <div key={seg.rarity} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: RARITY_GLOW_COLORS[seg.rarity] }}
            />
            <span className="text-text-secondary">{RARITY_LABELS[seg.rarity]}</span>
            <span className="text-text-muted ml-1">
              {seg.count} ({(seg.fraction * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
