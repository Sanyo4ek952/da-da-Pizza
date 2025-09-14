import type { Metadata } from 'next';
import '../../globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Da Da Pizza | Главная',
  description: 'Pizza',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
