import type { Metadata } from 'next'
import { Header } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Da Da Pizza | Главная',
  description: 'Pizza',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={'min-h-screen'}>
      <Header />
      {children}
    </main>
  )
}
