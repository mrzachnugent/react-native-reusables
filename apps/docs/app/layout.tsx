import './global.css';

import { CookiesProvider } from '@docs/components/cookies-provider';
import { SafeAreaProvider } from '@docs/components/safe-area-provider';
import { cn } from '@docs/lib/utils';
import { SearchLink } from 'fumadocs-ui/components/dialog/search';
import { RootProvider } from 'fumadocs-ui/provider';
import { Geist, Geist_Mono } from 'next/font/google';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
});

const SEARCH_OPTIONS = {
  links: [
    ['Installation', '/docs/installation'],
    ['Customization', '/docs/customization'],
    ['Changelog', '/docs/changelog'],
    ['CLI', '/docs/cli'],
  ] satisfies SearchLink[],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' className={cn(fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <CookiesProvider>
          <SafeAreaProvider>
            <RootProvider search={SEARCH_OPTIONS}>{children}</RootProvider>
          </SafeAreaProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
