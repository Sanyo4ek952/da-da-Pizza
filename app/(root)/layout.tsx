import type { Metadata } from 'next';
import { Header } from '@widgets/header/ui/header';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Da Da Pizza | Главная',
  description: 'Pizza',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <main className={'min-h-screen'}>
      <Header />
      {children}
      {modal}
    </main>
  );
}
