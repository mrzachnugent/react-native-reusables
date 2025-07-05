import { CookiesProvider } from '@docs/components/cookies-provider';
import { SafeAreaProvider } from '@docs/components/safe-area-provider';
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
        <CookiesProvider>
          <SafeAreaProvider>
            <RootProvider>{children}</RootProvider>
          </SafeAreaProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
