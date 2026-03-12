import { useInventoryStore } from '@/store/useInventoryStore'
import type { Rarity, WearCondition, WeaponType } from '@/types'

const RARITIES: Array<{ value: Rarity | 'all'; label: string }> = [
  { value: 'all', label: 'All Rarities' },
  { value: 'mil-spec', label: 'Mil-Spec' },
  { value: 'restricted', label: 'Restricted' },
  { value: 'classified', label: 'Classified' },
  { value: 'covert', label: 'Covert' },
  { value: 'rare-special', label: 'Rare Special' },
]

const WEARS: Array<{ value: WearCondition | 'all'; label: string }> = [
  { value: 'all', label: 'All Wears' },
  { value: 'Factory New', label: 'Factory New' },
  { value: 'Minimal Wear', label: 'Minimal Wear' },
  { value: 'Field-Tested', label: 'Field-Tested' },
  { value: 'Well-Worn', label: 'Well-Worn' },
  { value: 'Battle-Scarred', label: 'Battle-Scarred' },
]

const WEAPON_TYPES: Array<{ value: WeaponType | 'all'; label: string }> = [
  { value: 'all', label: 'All Types' },
  { value: 'Rifle', label: 'Rifle' },
  { value: 'Pistol', label: 'Pistol' },
  { value: 'SMG', label: 'SMG' },
  { value: 'Shotgun', label: 'Shotgun' },
  { value: 'Sniper', label: 'Sniper' },
  { value: 'Knife', label: 'Knife' },
  { value: 'Gloves', label: 'Gloves' },
]

const SORTS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'rarity', label: 'By Rarity' },
  { value: 'wear', label: 'By Wear' },
]

const selectClass =
  'bg-bg-card border border-border text-text-primary text-sm rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none focus:border-border-hover transition-colors'

export function InventoryFilters() {
  const filters = useInventoryStore((s) => s.filters)
  const setFilters = useInventoryStore((s) => s.setFilters)
  const resetFilters = useInventoryStore((s) => s.resetFilters)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        className={selectClass}
        value={filters.rarity}
        onChange={(e) => setFilters({ rarity: e.target.value as Rarity | 'all' })}
      >
        {RARITIES.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.wear}
        onChange={(e) => setFilters({ wear: e.target.value as WearCondition | 'all' })}
      >
        {WEARS.map((w) => (
          <option key={w.value} value={w.value}>{w.label}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.weaponType}
        onChange={(e) => setFilters({ weaponType: e.target.value as WeaponType | 'all' })}
      >
        {WEAPON_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.sortBy}
        onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <button
        onClick={resetFilters}
        className="text-xs text-text-muted hover:text-text-primary transition-colors px-2 py-1.5 cursor-pointer"
      >
        Reset
      </button>
    </div>
  )
}
