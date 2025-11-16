import React from 'react'
import styles from './input.module.css'
import clsx from 'clsx'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * Input size
   */
  size?: 'small' | 'middle' | 'large'
  /**
   * Input status
   */
  status?: 'error' | 'warning'
  /**
   * Prefix content
   */
  prefix?: React.ReactNode
  /**
   * Suffix content
   */
  suffix?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'middle',
      status,
      prefix,
      suffix,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          styles.inputWrapper,
          styles[size],
          {
            [styles[status as string]]: status,
            [styles.disabled]: disabled,
          },
          className
        )}
      >
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          {...props}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
