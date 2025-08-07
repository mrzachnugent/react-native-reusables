'use client';

import { CookiesNextProvider } from 'cookies-next';

export function CookiesProvider({ children }: { children: React.ReactNode }) {
  return <CookiesNextProvider>{children}</CookiesNextProvider>;
}
