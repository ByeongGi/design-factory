import React from 'react'
import clsx from 'clsx'
import styles from './input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error state */
  error?: boolean
  /** Error message (sets error to true) */
  errorMessage?: string
  /** Full width input */
  fullWidth?: boolean
  /** Input variant */
  variant?: 'outlined' | 'filled'
}

/**
 * Material Design Input Component
 *
 * A text input component following Material Design specifications with
 * floating labels and helper text.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      fullWidth = false,
      variant = 'outlined',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = error || !!errorMessage
    const displayHelperText = errorMessage || helperText

    return (
      <div
        className={clsx(styles.inputWrapper, {
          [styles.fullWidth]: fullWidth,
        })}
      >
        <div
          className={clsx(
            styles.inputContainer,
            styles[variant],
            {
              [styles.error]: hasError,
              [styles.disabled]: props.disabled,
            },
            className
          )}
        >
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          <input ref={ref} id={inputId} className={styles.input} {...props} />
        </div>
        {displayHelperText && (
          <div
            className={clsx(styles.helperText, {
              [styles.errorText]: hasError,
            })}
          >
            {displayHelperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
