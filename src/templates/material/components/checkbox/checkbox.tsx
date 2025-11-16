import React from 'react'
import clsx from 'clsx'
import styles from './checkbox.module.css'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Checkbox label */
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={styles.checkboxWrapper}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={clsx(styles.checkbox, className)}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
