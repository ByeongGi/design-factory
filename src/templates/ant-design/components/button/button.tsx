import React from 'react'
import styles from './button.module.css'
import clsx from 'clsx'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Button type variant
   */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  /**
   * HTML button type
   */
  htmlType?: 'button' | 'submit' | 'reset'
  /**
   * Button size
   */
  size?: 'small' | 'middle' | 'large'
  /**
   * Button color for specific states
   */
  danger?: boolean
  /**
   * Set the loading state
   */
  loading?: boolean
  /**
   * Make button full width
   */
  block?: boolean
  /**
   * Button shape
   */
  shape?: 'default' | 'circle' | 'round'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'default',
      htmlType = 'button',
      size = 'middle',
      danger = false,
      loading = false,
      block = false,
      shape = 'default',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={htmlType}
        className={clsx(
          styles.button,
          styles[type],
          styles[size],
          {
            [styles.danger]: danger,
            [styles.loading]: loading,
            [styles.block]: block,
            [styles[shape]]: shape !== 'default',
          },
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.loadingIcon}>⟳</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
