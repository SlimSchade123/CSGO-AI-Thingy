export const REEL_CONFIG = {
  TOTAL_ITEMS: 60,
  VISIBLE_COUNT: 7,
  ITEM_WIDTH: 128,
  ITEM_GAP: 6,
  TARGET_INDEX: 54, // winning item position (from start of strip)
  CENTER_VISIBLE_INDEX: 3, // which visible slot is "center" (0-indexed)
  SPIN_DURATION_MS: 8000,
  QUICK_SPIN_DURATION_MS: 50,
} as const

// easeOutQuart: decelerates strongly at the end
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export function computeTargetScrollX(): number {
  const { TARGET_INDEX, CENTER_VISIBLE_INDEX, ITEM_WIDTH, ITEM_GAP } = REEL_CONFIG
  return (TARGET_INDEX - CENTER_VISIBLE_INDEX) * (ITEM_WIDTH + ITEM_GAP)
}
