import { Nunito } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <head>
        <link data-rh="true" rel={'icon'} href={'/logo.png'} />
      </head>
      <Suspense fallback={<div>Загрузка...</div>}>
        <body className={`${nunito.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </Suspense>
    </html>
  );
}
