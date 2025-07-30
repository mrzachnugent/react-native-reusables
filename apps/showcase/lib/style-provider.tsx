import { storage } from '@showcase/lib/storage';
import * as React from 'react';
import { type Registry, RegistryProvider } from '@/registry/registry-provider';

const StyleContext = React.createContext<{
  style: Registry;
  setStyle: (style: Registry) => void;
} | null>(null);

function StyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyleState] = React.useState<Registry>(() => {
    const style = storage.getString('theme.style');
    return style === 'default' ? 'default' : 'new-york';
  });

  function setStyle(style: Registry) {
    try {
      storage.set('theme.style', style);
      setStyleState(style);
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
