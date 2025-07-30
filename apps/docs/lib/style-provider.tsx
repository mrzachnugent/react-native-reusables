'use client';

import * as React from 'react';
import { type Registry, RegistryProvider } from '@/registry/registry-provider';
import { useReactiveGetCookie, useReactiveSetCookie } from 'cookies-next/client';

const StyleContext = React.createContext<{
  style: Registry;
  setStyle: (style: Registry) => void;
} | null>(null);

function StyleProvider({ children }: { children: React.ReactNode }) {
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const style = (getCookie('theme.style') as Registry) ?? 'new-york';

  function setStyle(style: Registry) {
    try {
      setCookie('theme.style', style);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      <RegistryProvider registry={style}>{children}</RegistryProvider>
    </StyleContext.Provider>
  );
}

function useStyle() {
  const context = React.useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}

export { StyleProvider, useStyle };
