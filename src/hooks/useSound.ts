import { useRef, useCallback } from 'react'
import { useUIStore } from '@/store/useUIStore'

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

function playTone(
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'sine',
  fadeOut = true
) {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    if (fadeOut) {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    }
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Audio context may not be available
  }
}

export function useSound() {
  const soundEnabled = useUIStore((s) => s.soundEnabled)
  const lastTickIndexRef = useRef(-1)

  const playTick = useCallback(() => {
    if (!soundEnabled) return
    playTone(1800 + Math.random() * 400, 0.04, 0.12, 'square', true)
  }, [soundEnabled])

  const playReveal = useCallback((rarity: string) => {
    if (!soundEnabled) return
    const isHighValue = rarity === 'covert' || rarity === 'rare-special'
    if (isHighValue) {
      // Dramatic chord for high-value items
      const freqs = [220, 330, 440, 660]
      freqs.forEach((f, i) => {
        setTimeout(() => playTone(f, 1.2, 0.15, 'sine', true), i * 80)
      })
    } else {
      playTone(880, 0.4, 0.15, 'sine', true)
      setTimeout(() => playTone(1100, 0.3, 0.1, 'sine', true), 100)
    }
  }, [soundEnabled])

  const checkAndPlayTick = useCallback(
    (currentScrollX: number, itemWidth: number, itemGap: number) => {
      if (!soundEnabled) return
      const itemIndex = Math.floor(currentScrollX / (itemWidth + itemGap))
      if (itemIndex !== lastTickIndexRef.current) {
        lastTickIndexRef.current = itemIndex
        playTick()
      }
    },
    [soundEnabled, playTick]
  )

  const resetTick = useCallback(() => {
    lastTickIndexRef.current = -1
  }, [])

  return { playTick, playReveal, checkAndPlayTick, resetTick }
}
