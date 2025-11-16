import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Design Factory - Design System Templates',
  description: '여러 디자인 시스템의 독립적인 템플릿을 보여주고, 비교하며, 코드를 복사하고, 전체 템플릿을 다운로드할 수 있는 플랫폼',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
