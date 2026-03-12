interface StatPanelProps {
  label: string
  value: string
  subtext?: string
  color?: string
}

export function StatPanel({ label, value, subtext, color }: StatPanelProps) {
  return (
    <div className="bg-bg-card rounded-xl border border-border p-4 flex flex-col gap-1">
      <p className="text-xs text-text-muted uppercase tracking-widest">{label}</p>
      <p
        className="text-2xl font-bold tabular-nums"
        style={{ color: color ?? '#e8e8e8', fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
      {subtext && <p className="text-xs text-text-muted">{subtext}</p>}
    </div>
  )
}
