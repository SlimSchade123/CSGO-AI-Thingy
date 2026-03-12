import { useEffect, useRef, useMemo } from 'react'
import type { SkinDefinition, InventoryItem } from '@/types'
import { CASES } from '@/data/cases'
import { ReelItem } from './ReelItem'
import { ReelMarker } from './ReelMarker'
import { REEL_CONFIG, easeOutQuart, computeTargetScrollX } from '@/lib/animation'
import { useSound } from '@/hooks/useSound'

interface SpinReelProps {
  caseId: string
  targetItem: InventoryItem
  duration: number
  onComplete: () => void
}

function buildReelStrip(allSkins: SkinDefinition[], targetItem: InventoryItem): SkinDefinition[] {
  const { TOTAL_ITEMS, TARGET_INDEX } = REEL_CONFIG
  const strip: SkinDefinition[] = []

  for (let i = 0; i < TOTAL_ITEMS; i++) {
    if (i === TARGET_INDEX) {
      strip.push(targetItem.skin)
    } else {
      // Pick random skin from case pool (any rarity for visual variety)
      strip.push(allSkins[Math.floor(Math.random() * allSkins.length)])
    }
  }
  return strip
}

export function SpinReel({ caseId, targetItem, duration, onComplete }: SpinReelProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const { checkAndPlayTick, resetTick } = useSound()

  const caseData = CASES.find((c) => c.id === caseId)
  const allSkins = caseData?.skins ?? []

  const strip = useMemo(
    () => buildReelStrip(allSkins, targetItem),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetItem.instanceId]
  )

  const { ITEM_WIDTH, ITEM_GAP, TARGET_INDEX } = REEL_CONFIG
  const totalScrollX = computeTargetScrollX()

  useEffect(() => {
    if (!stripRef.current) return
    resetTick()

    if (duration <= 50) {
      // Quick open — jump directly to target position
      stripRef.current.style.transform = `translateX(-${totalScrollX}px)`
      onCompleteRef.current()
      return
    }

    startTimeRef.current = performance.now()

    function animate(now: number) {
      const elapsed = now - startTimeRef.current
      const t = Math.min(elapsed / duration, 1)
      const easedT = easeOutQuart(t)
      const currentX = totalScrollX * easedT

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(-${currentX}px)`
        checkAndPlayTick(currentX, ITEM_WIDTH, ITEM_GAP)
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        onCompleteRef.current()
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [targetItem.instanceId, duration, totalScrollX, ITEM_WIDTH, ITEM_GAP, checkAndPlayTick, resetTick])

  // Visible window width = 7 items + 6 gaps
  const viewportWidth = REEL_CONFIG.VISIBLE_COUNT * ITEM_WIDTH + (REEL_CONFIG.VISIBLE_COUNT - 1) * ITEM_GAP

  return (
    <div
      className="relative"
      style={{ width: viewportWidth, height: 160 }}
    >
      {/* Strip container with overflow hidden */}
      <div
        className="reel-container w-full h-full"
        style={{ width: viewportWidth }}
      >
        <div
          ref={stripRef}
          className="reel-strip"
          style={{ transform: 'translateX(0px)' }}
        >
          {strip.map((skin, i) => (
            <ReelItem
              key={i}
              skin={skin}
              wear={i === TARGET_INDEX ? targetItem.wear : undefined}
              isCenter={false}
            />
          ))}
        </div>
      </div>

      {/* Left/right fade gradients */}
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, #0a0a0f, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, #0a0a0f, transparent)' }}
      />

      <ReelMarker />
    </div>
  )
}
