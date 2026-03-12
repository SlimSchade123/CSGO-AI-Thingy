import { useUIStore } from '@/store/useUIStore'
import { useEconomyStore } from '@/store/useEconomyStore'
import type { ActivePage } from '@/types'

const NAV_ITEMS: Array<{ id: ActivePage; label: string; icon: string }> = [
  { id: 'cases', label: 'Cases', icon: '📦' },
  { id: 'inventory', label: 'Inventory', icon: '🎒' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'history', label: 'History', icon: '📜' },
]

export function Sidebar() {
  const activePage = useUIStore((s) => s.activePage)
  const setPage = useUIStore((s) => s.setPage)
  const lastDailyClaim = useEconomyStore((s) => s.lastDailyClaim)

  const dailyAvailable =
    lastDailyClaim === null || Date.now() - lastDailyClaim >= 24 * 60 * 60 * 1000

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-52 bg-bg-secondary border-r border-border shrink-0 py-4">
        <div className="px-4 mb-6">
          <h1
            className="text-lg font-bold text-accent uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CS Simulator
          </h1>
          <p className="text-xs text-text-muted mt-0.5">Case Opening Sim</p>
        </div>

        <nav className="flex flex-col gap-1 px-2 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-item ${activePage === item.id ? 'nav-item-active' : 'nav-item-inactive'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'cases' && dailyAvailable && (
                <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto pt-4 border-t border-border">
          <p className="text-xs text-text-muted text-center">
            Not affiliated with Valve or CS2
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary border-t border-border flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors relative
              ${activePage === item.id ? 'text-accent' : 'text-text-secondary'}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === 'cases' && dailyAvailable && (
              <span className="absolute top-1 right-1/4 w-2 h-2 rounded-full bg-green-400" />
            )}
          </button>
        ))}
      </nav>
    </>
  )
}
