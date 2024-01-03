import React from 'react';

interface AugmentRefProps<T> {
  ref: React.Ref<T>;
  augmentedRef: React.ForwardedRef<T>;
  methods?: Record<string, (...args: any[]) => any>;
  deps?: any[];
}

export function useAugmentedRef<T>({
  augmentedRef,
  ref,
  methods,
  deps = [],
}: AugmentRefProps<T>) {
  React.useImperativeHandle(
    ref,
    () => {
      if (typeof augmentedRef === 'function' || !augmentedRef?.current) {
        return {} as T;
      }
      return {
        ...augmentedRef.current,
        ...methods,
      };
    },
    deps
  );
}
