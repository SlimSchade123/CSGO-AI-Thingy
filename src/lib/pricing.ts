import type { WearCondition } from '@/types'
import { WEAR_MULTIPLIERS, SELL_PERCENTAGE } from '@/data/prices'

export function computePrice(basePrice: number, wear: WearCondition): number {
  const price = basePrice * WEAR_MULTIPLIERS[wear]
  // Round to 2 decimal places
  return Math.round(price * 100) / 100
}

export function computeSellPrice(price: number): number {
  return Math.round(price * SELL_PERCENTAGE * 100) / 100
}

export function formatCredits(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
