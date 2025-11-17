'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { TemplateConfig } from '@/lib/templates/types'

interface TemplateCardProps {
  template: TemplateConfig
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/templates/${template.id}`}>
      <article
        className="
          group relative h-full
          bg-[var(--color-cream)]
          border-2 border-[var(--color-border)]
          rounded-3xl overflow-hidden
          transition-all duration-500
          hover:border-[var(--color-border-dark)]
          hover:shadow-[var(--shadow-large)]
          hover:-translate-y-2
          cursor-pointer
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Preview Banner */}
        <div
          className="
            relative w-full h-56
            flex items-center justify-center
            overflow-hidden
            transition-all duration-500
            group-hover:h-64
          "
          style={{
            background: `linear-gradient(135deg, ${template.primaryColor}dd, ${template.primaryColor})`
          }}
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-4 border-white" />
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-4 border-white" />
          </div>

          {/* Template Initial */}
          <div
            className="
              relative z-10
              text-[var(--color-cream)] font-bold
              transition-all duration-500
              group-hover:scale-110
            "
            style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontFamily: 'var(--font-display)'
            }}
          >
            {template.name[0]}
          </div>

          {/* Color Indicator */}
          <div
            className="
              absolute top-4 left-4
              px-3 py-1.5 rounded-full
              bg-white bg-opacity-90
              backdrop-blur-sm
              text-xs font-semibold
              flex items-center gap-2
            "
            style={{ color: template.primaryColor }}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: template.primaryColor }}
            />
            {template.primaryColor}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="mb-3">
            <h3
              className="
                text-2xl font-bold mb-2
                text-[var(--color-text-primary)]
                transition-colors duration-300
                group-hover:text-[var(--color-emerald)]
              "
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {template.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[var(--color-text-secondary)] mb-4 flex-1 leading-relaxed">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1 rounded-full
                  bg-[var(--color-cream-dark)]
                  text-[var(--color-text-tertiary)]
                  text-xs font-medium
                  border border-[var(--color-border)]
                  transition-all duration-300
                  hover:border-[var(--color-emerald)]
                  hover:text-[var(--color-emerald)]
                "
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span
                className="
                  px-3 py-1 rounded-full
                  text-[var(--color-text-tertiary)]
                  text-xs font-medium
                "
              >
                +{template.tags.length - 3}
              </span>
            )}
          </div>

          {/* Stats */}
          <div
            className="
              flex items-center justify-between
              pt-4 mt-auto
              border-t-2 border-[var(--color-border)]
            "
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[var(--color-emerald)]">
                {template.stats.components}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                Components
              </span>
            </div>

            <div className="w-px h-10 bg-[var(--color-border)]" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[var(--color-terracotta)]">
                {template.stats.tokens}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                Tokens
              </span>
            </div>

            <div className="w-px h-10 bg-[var(--color-border)]" />

            <div className="flex flex-col items-end">
              <span
                className="
                  px-2 py-1 rounded
                  bg-[var(--color-gold)] bg-opacity-20
                  text-[var(--color-gold)]
                  text-xs font-bold
                "
              >
                {template.stats.wcagLevel}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)] mt-1">
                WCAG
              </span>
            </div>
          </div>
        </div>

        {/* Hover Arrow Indicator */}
        <div
          className={`
            absolute bottom-6 right-6
            w-10 h-10 rounded-full
            bg-[var(--color-emerald)]
            flex items-center justify-center
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
          `}
        >
          <svg
            className="w-5 h-5 text-[var(--color-cream)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </article>
    </Link>
  )
}
