import type { WearCondition } from '@/types'

export const WEAR_MULTIPLIERS: Record<WearCondition, number> = {
  'Factory New': 1.0,
  'Minimal Wear': 0.85,
  'Field-Tested': 0.65,
  'Well-Worn': 0.45,
  'Battle-Scarred': 0.30,
}

// Wear condition drop probabilities (must sum to 1)
export const WEAR_PROBABILITIES: Array<{ wear: WearCondition; weight: number }> = [
  { wear: 'Factory New', weight: 0.03 },
  { wear: 'Minimal Wear', weight: 0.24 },
  { wear: 'Field-Tested', weight: 0.33 },
  { wear: 'Well-Worn', weight: 0.24 },
  { wear: 'Battle-Scarred', weight: 0.16 },
]

// Sell back percentage of market value
export const SELL_PERCENTAGE = 0.75
