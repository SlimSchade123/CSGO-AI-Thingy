import type { Rarity } from '@/types'

export const RARITY_LABELS: Record<Rarity, string> = {
  'mil-spec': 'Mil-Spec',
  'restricted': 'Restricted',
  'classified': 'Classified',
  'covert': 'Covert',
  'rare-special': 'Rare Special',
}

// Full static class strings — required for Tailwind v4 scanner to detect them
export const RARITY_BORDER_CLASSES: Record<Rarity, string> = {
  'mil-spec': 'border-rarity-mil-spec',
  'restricted': 'border-rarity-restricted',
  'classified': 'border-rarity-classified',
  'covert': 'border-rarity-covert',
  'rare-special': 'border-rarity-special',
}

export const RARITY_TEXT_CLASSES: Record<Rarity, string> = {
  'mil-spec': 'text-rarity-mil-spec',
  'restricted': 'text-rarity-restricted',
  'classified': 'text-rarity-classified',
  'covert': 'text-rarity-covert',
  'rare-special': 'text-rarity-special',
}

export const RARITY_BG_CLASSES: Record<Rarity, string> = {
  'mil-spec': 'bg-rarity-mil-spec',
  'restricted': 'bg-rarity-restricted',
  'classified': 'bg-rarity-classified',
  'covert': 'bg-rarity-covert',
  'rare-special': 'bg-rarity-special',
}

export const RARITY_GLOW_COLORS: Record<Rarity, string> = {
  'mil-spec': '#4b69ff',
  'restricted': '#8847ff',
  'classified': '#d32ce6',
  'covert': '#eb4b4b',
  'rare-special': '#e4ae39',
}

export const RARITY_ORDER: Record<Rarity, number> = {
  'mil-spec': 0,
  'restricted': 1,
  'classified': 2,
  'covert': 3,
  'rare-special': 4,
}
