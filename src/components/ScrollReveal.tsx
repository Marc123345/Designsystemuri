'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * The restrained blur/translate reveal used by the sticky story sections.
 * Mirrors the timing idea in Marc's UI reference without turning ordinary
 * reading into a long entrance animation.
 */
const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.24, 0.74, 0.58, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
