import type { WritableAtom } from 'jotai';
import { ScopeProvider } from 'jotai-scope';
import { useHydrateAtoms } from 'jotai/react/utils';
import React from 'react';

interface AtomScopeProviderProps<T> {
  atom: WritableAtom<unknown, [T], unknown>;
  value: T;
  children: React.ReactNode;
}

export function AtomScopeProvider<T>({
  atom,
  value,
  children,
}: AtomScopeProviderProps<T>) {
  const id = React.useId();
  return (
    <ScopeProvider
      key={__DEV__ ? `${id}-${JSON.stringify(value)}` : undefined}
      atoms={[atom]}
    >
      <AtomsHydrator atom={atom} value={value}>
        {children}
      </AtomsHydrator>
    </ScopeProvider>
  );
}

/**
 * @docs https://jotai.org/docs/guides/initialize-atom-on-render#using-typescript
 */
function AtomsHydrator<T>({
  atom,
  value,
  children,
}: AtomScopeProviderProps<T>) {
  useHydrateAtoms(new Map([[atom, value]]));
  return children;
}
