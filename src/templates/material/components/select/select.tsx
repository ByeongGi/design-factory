import React from 'react'
import clsx from 'clsx'
import styles from './select.module.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Select label */
  label?: string
  /** Options */
  options: SelectOption[]
  /** Full width */
  fullWidth?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, fullWidth = false, className, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={clsx(styles.selectWrapper, { [styles.fullWidth]: fullWidth })}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}
        <select ref={ref} id={selectId} className={clsx(styles.select, className)} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'
