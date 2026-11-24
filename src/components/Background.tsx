import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

/** Fixed backdrop: fading grid, ambient gradient blobs and a glow that follows the cursor. */
export function Background() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, var(--glow), transparent 70%)`

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 size-[28rem] rounded-full bg-accent-2/10 blur-[120px]" />
      <motion.div className="absolute inset-0" style={{ background: glow }} />
    </div>
  )
}
