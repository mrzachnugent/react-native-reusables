'use client';

import * as React from 'react';

type Registry = 'default' | 'new-york';

const RegistryContext = React.createContext<Registry | null>(null);

function RegistryProvider({
  registry = 'new-york',
  children,
}: {
  registry?: Registry;
  children: React.ReactNode;
}) {
  return <RegistryContext.Provider value={registry}>{children}</RegistryContext.Provider>;
}

function useRegistry() {
  const context = React.useContext(RegistryContext);
  if (!context) {
    throw new Error('useRegistry must be used within a RegistryProvider');
  }
  return context;
}

function withRegistryProvider<TProps>(
  DefaultComponent: React.ComponentType<TProps>,
  NewYorkComponent: React.ComponentType<TProps>
) {
  return function StyledComponent(props: TProps) {
    const registry = useRegistry();
    const Component = registry === 'default' ? DefaultComponent : NewYorkComponent;
    return <Component {...(props as any)} />;
  };
}

function withRegistryContentContext<T>(
  DefaultContext: React.Context<T>,
  NewYorkContext: React.Context<T>
): React.Context<T> {
  const WrapperContext = React.createContext<T>(undefined as any);

  function WrapperProvider({ value, children }: { value: T; children: React.ReactNode }) {
    const registry = useRegistry();
    const Provider = registry === 'default' ? DefaultContext.Provider : NewYorkContext.Provider;
    return <Provider value={value}>{children}</Provider>;
  }

  function WrapperConsumer({ children }: { children: (value: T) => React.ReactNode }) {
    const registry = useRegistry();
    const Consumer = registry === 'default' ? DefaultContext.Consumer : NewYorkContext.Consumer;
    return <Consumer>{children}</Consumer>;
  }

  (WrapperContext as any).Provider = WrapperProvider;
  (WrapperContext as any).Consumer = WrapperConsumer;

  return WrapperContext;
}

export { RegistryProvider, withRegistryProvider, withRegistryContentContext };
export type { Registry };
