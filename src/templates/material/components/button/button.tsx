import React from 'react'
import clsx from 'clsx'
import styles from './button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: 'contained' | 'outlined' | 'text'
  /** Button color scheme */
  color?: 'primary' | 'secondary' | 'error' | 'success'
  /** Button size */
  size?: 'small' | 'medium' | 'large'
  /** Full width button */
  fullWidth?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Button content */
  children: React.ReactNode
}

/**
 * Material Design Button Component
 *
 * A button component following Material Design 3 specifications with
 * elevation-based states and ripple effects.
 *
 * @example
 * ```tsx
 * <Button variant="contained" color="primary">
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[color],
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.disabled]: disabled,
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
