import { useEconomyStore } from '@/store/useEconomyStore'

const COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24 hours

export function useDailyCase() {
  const lastDailyClaim = useEconomyStore((s) => s.lastDailyClaim)
  const claimDailyReward = useEconomyStore((s) => s.claimDailyReward)

  const now = Date.now()
  const isAvailable = lastDailyClaim === null || now - lastDailyClaim >= COOLDOWN_MS

  const timeUntilNext = lastDailyClaim
    ? Math.max(0, COOLDOWN_MS - (now - lastDailyClaim))
    : 0

  const progressPercent = lastDailyClaim
    ? Math.min(100, ((now - lastDailyClaim) / COOLDOWN_MS) * 100)
    : 100

  function formatCountdown(ms: number): string {
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    return `${h}h ${m}m ${s}s`
  }

  return {
    isAvailable,
    timeUntilNext,
    progressPercent,
    countdown: formatCountdown(timeUntilNext),
    claim: claimDailyReward,
  }
}
