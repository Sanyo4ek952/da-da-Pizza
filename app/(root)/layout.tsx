import type { Metadata } from 'next'
import { Header } from '@/components/shared'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Da Da Pizza | Главная',
  description: 'Pizza',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className={'min-h-screen'}>
      <Header />
      {children}
    </main>
  )
}
