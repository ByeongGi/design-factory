import React from 'react'
import clsx from 'clsx'
import styles from './card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevation level (0-4) */
  elevation?: 0 | 1 | 2 | 3 | 4
  /** Card content */
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ elevation = 1, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.card, styles[`elevation${elevation}`], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
