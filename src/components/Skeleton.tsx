import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  animation?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  borderRadius = '0.375rem',
  animation = true,
}) => {
  const skeletonVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className={`bg-white/10 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      variants={animation ? skeletonVariants : {}}
      animate={animation ? 'pulse' : {}}
      aria-hidden="true"
    />
  )
}

// Pre-built skeleton components for common use cases
export const SkeletonText: React.FC<Omit<SkeletonProps, 'height' | 'borderRadius'>> = (props) => (
  <Skeleton height="1rem" borderRadius="0.25rem" {...props} />
)

export const SkeletonTitle: React.FC<Omit<SkeletonProps, 'height' | 'borderRadius'>> = (props) => (
  <Skeleton height="1.5rem" borderRadius="0.375rem" {...props} />
)

export const SkeletonAvatar: React.FC<Omit<SkeletonProps, 'height' | 'width' | 'borderRadius'>> = (props) => (
  <Skeleton width="2.5rem" height="2.5rem" borderRadius="50%" {...props} />
)

export const SkeletonButton: React.FC<Omit<SkeletonProps, 'height' | 'borderRadius'>> = (props) => (
  <Skeleton height="2.5rem" borderRadius="0.375rem" {...props} />
)

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 ${className}`}>
    <SkeletonTitle className="mb-4" />
    <SkeletonText className="mb-2" />
    <SkeletonText className="mb-2" width="80%" />
    <SkeletonText className="mb-4" width="60%" />
    <SkeletonButton />
  </div>
)

export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = ''
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <SkeletonTitle width="60%" />
          <SkeletonText width="40%" />
        </div>
      </div>
    ))}
  </div>
)

export default Skeleton