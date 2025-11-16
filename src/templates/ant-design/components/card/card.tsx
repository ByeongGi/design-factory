import React from 'react'
import styles from './card.module.css'
import clsx from 'clsx'

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Card title
   */
  title?: React.ReactNode
  /**
   * Card extra content (top-right)
   */
  extra?: React.ReactNode
  /**
   * Show border
   */
  bordered?: boolean
  /**
   * Show hover shadow
   */
  hoverable?: boolean
  /**
   * Card size
   */
  size?: 'small' | 'default'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      extra,
      bordered = true,
      hoverable = false,
      size = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          {
            [styles.bordered]: bordered,
            [styles.hoverable]: hoverable,
            [styles.small]: size === 'small',
          },
          className
        )}
        {...props}
      >
        {(title || extra) && (
          <div className={styles.header}>
            {title && <div className={styles.title}>{title}</div>}
            {extra && <div className={styles.extra}>{extra}</div>}
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    )
  }
)

Card.displayName = 'Card'
