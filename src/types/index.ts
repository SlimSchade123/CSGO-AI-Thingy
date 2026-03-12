export type Rarity =
  | 'mil-spec'
  | 'restricted'
  | 'classified'
  | 'covert'
  | 'rare-special'

export type WearCondition =
  | 'Factory New'
  | 'Minimal Wear'
  | 'Field-Tested'
  | 'Well-Worn'
  | 'Battle-Scarred'

export type WeaponType =
  | 'Rifle'
  | 'Pistol'
  | 'SMG'
  | 'Shotgun'
  | 'Sniper'
  | 'Knife'
  | 'Gloves'

export interface SkinDefinition {
  id: string
  weaponName: string
  skinName: string
  weaponType: WeaponType
  rarity: Rarity
  basePrice: number
}

export interface CaseDefinition {
  id: string
  name: string
  cost: number
  description: string
  accentColor: string
  skins: SkinDefinition[]
}

export interface InventoryItem {
  instanceId: string
  skin: SkinDefinition
  wear: WearCondition
  price: number
  acquiredAt: number
  caseId: string
}

export interface HistoryRecord {
  id: string
  timestamp: number
  caseId: string
  caseName: string
  item: InventoryItem
  spent: number
}

export type FilterSortBy =
  | 'price-desc'
  | 'price-asc'
  | 'rarity'
  | 'wear'
  | 'newest'

export interface FilterState {
  rarity: Rarity | 'all'
  wear: WearCondition | 'all'
  weaponType: WeaponType | 'all'
  sortBy: FilterSortBy
}

export type ActivePage = 'cases' | 'inventory' | 'stats' | 'history'

export type OpenPhase = 'idle' | 'spinning' | 'revealing' | 'done'
