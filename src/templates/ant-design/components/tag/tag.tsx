import React from 'react'
import styles from './tag.module.css'
import clsx from 'clsx'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Tag color
   */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  /**
   * Whether tag can be closed
   */
  closable?: boolean
  /**
   * Callback when close is clicked
   */
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      color = 'default',
      closable = false,
      onClose,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      onClose?.(e)
    }

    return (
      <span
        ref={ref}
        className={clsx(styles.tag, styles[color], className)}
        {...props}
      >
        {children}
        {closable && (
          <span className={styles.closeIcon} onClick={handleClose}>
            ×
          </span>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'
