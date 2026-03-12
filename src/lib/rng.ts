import type { Rarity, WearCondition, SkinDefinition } from '@/types'
import { WEAR_PROBABILITIES } from '@/data/prices'

// Rarity weights — must sum to 1
const RARITY_WEIGHTS: Array<{ rarity: Rarity; weight: number }> = [
  { rarity: 'mil-spec', weight: 0.7992 },
  { rarity: 'restricted', weight: 0.1598 },
  { rarity: 'classified', weight: 0.032 },
  { rarity: 'covert', weight: 0.0064 },
  { rarity: 'rare-special', weight: 0.0026 },
]

function weightedRandom<T>(items: Array<{ weight: number } & T>): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0)
  let roll = Math.random() * total
  for (const item of items) {
    roll -= item.weight
    if (roll <= 0) return item
  }
  return items[items.length - 1]
}

export function rollRarity(): Rarity {
  return weightedRandom(RARITY_WEIGHTS).rarity
}

export function rollWear(): WearCondition {
  return weightedRandom(WEAR_PROBABILITIES).wear
}

export function rollSkin(skins: SkinDefinition[], rarity: Rarity): SkinDefinition {
  const pool = skins.filter((s) => s.rarity === rarity)
  // If no skins match this rarity (shouldn't happen with good data), fall back to mil-spec
  const effectivePool = pool.length > 0 ? pool : skins.filter((s) => s.rarity === 'mil-spec')
  return effectivePool[Math.floor(Math.random() * effectivePool.length)]
}

export function generateInstanceId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
