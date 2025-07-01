import { SafeAreaProvider } from '@docs/components/reusables';
import { cn } from '@docs/lib/utils';
import { RootProvider } from 'fumadocs-ui/provider';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={cn(fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <SafeAreaProvider>
          <RootProvider>{children}</RootProvider>
        </SafeAreaProvider>
      </body>
    </html>
  );
}
