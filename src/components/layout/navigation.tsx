'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'glass shadow-[var(--shadow-soft)] border-b border-[var(--color-border)]'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group relative"
          >
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-[var(--color-emerald)]">Design</span>
              <span className="text-[var(--color-terracotta)] ml-1">Factory</span>
            </span>
            <span
              className="
                absolute -bottom-1 left-0 w-0 h-0.5
                bg-gradient-to-r from-[var(--color-emerald)] to-[var(--color-terracotta)]
                transition-all duration-300 group-hover:w-full
              "
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <NavLink href="/" isActive={isActive('/')}>
              Templates
            </NavLink>
            <NavLink href="/compare" isActive={isActive('/compare')}>
              Compare
            </NavLink>
            <NavLink href="/tokens" isActive={isActive('/tokens')}>
              Tokens
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({
  href,
  isActive,
  children
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 rounded-full
        font-medium text-sm md:text-base
        transition-all duration-300
        hover:scale-105
        ${isActive
          ? 'text-[var(--color-cream)] bg-[var(--color-emerald)] shadow-[var(--shadow-soft)]'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-emerald)] hover:bg-[var(--color-cream-dark)]'
        }
      `}
    >
      {children}
      {isActive && (
        <span
          className="
            absolute inset-0 rounded-full
            bg-[var(--color-emerald)]
            opacity-20 animate-pulse
          "
        />
      )}
    </Link>
  )
}
