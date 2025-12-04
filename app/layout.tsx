import { Nunito } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@shared/components/shared';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});
export const metadata = {
  title: 'Da Da Pizza',
  icons: {
    icon: '/logo.png',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <body className={`${nunito.variable} antialiased`}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Providers>{children}</Providers>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
