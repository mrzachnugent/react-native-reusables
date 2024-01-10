import React from 'react';
import {
  ImageErrorEventData,
  ImageLoadEventData,
  NativeSyntheticEvent,
  Image as RNImage,
  View,
} from 'react-native';
import { StoreApi, createStore, useStore } from 'zustand';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import {
  ComponentPropsWithAsChild,
  SlottableViewProps,
  ViewRef,
} from '~/lib/rn-primitives/types';
import { AvatarImageProps, AvatarRootProps } from './types';

type AvatarState = 'loading' | 'error' | 'loaded';

interface RootStoreContext {
  status: AvatarState;
  setStatus: (status: AvatarState) => void;
}

const RootContext = React.createContext<AvatarRootProps | null>(null);
const RootStoreContext = React.createContext<StoreApi<RootStoreContext> | null>(
  null
);

const Root = React.forwardRef<ViewRef, SlottableViewProps & AvatarRootProps>(
  ({ asChild, alt, ...viewProps }, ref) => {
    const storeRef = React.useRef<StoreApi<RootStoreContext> | null>(null);
    if (!storeRef.current) {
      storeRef.current = createStore((set) => ({
        status: 'loading',
        setStatus: (status: AvatarState) => set({ status }),
      }));
    }
    const Component = asChild ? Slot.View : View;
    return (
      <RootStoreContext.Provider value={storeRef.current}>
        <RootContext.Provider value={{ alt }}>
          <Component ref={ref} {...viewProps} />
        </RootContext.Provider>
      </RootStoreContext.Provider>
    );
  }
);

Root.displayName = 'RootAvatar';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Avatar compound components cannot be rendered outside the Avatar component'
    );
  }
  return context;
}

function useRootStoreContext<T>(selector: (state: RootStoreContext) => T): T {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return useStore(store, selector);
}

const Image = React.forwardRef<
  React.ElementRef<typeof RNImage>,
  Omit<ComponentPropsWithAsChild<typeof RNImage>, 'alt'> & AvatarImageProps
>(
  (
    {
      asChild,
      onLoad: onLoadProps,
      onError: onErrorProps,
      onLoadingStatusChange,
      ...props
    },
    ref
  ) => {
    const { alt } = useRootContext();
    const status = useRootStoreContext((state) => state.status);
    const setStatus = useRootStoreContext((state) => state.setStatus);

    const onLoad = React.useCallback(
      (e: NativeSyntheticEvent<ImageLoadEventData>) => {
        setStatus('loaded');
        onLoadingStatusChange?.('loaded');
        onLoadProps?.(e);
      },
      [onLoadProps]
    );

    const onError = React.useCallback(
      (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        setStatus('error');
        onLoadingStatusChange?.('error');
        onErrorProps?.(e);
      },
      [onErrorProps]
    );

    if (status === 'error') {
      return null;
    }

    const Component = asChild ? Slot.Image : RNImage;
    return (
      <Component
        ref={ref}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }
);

Image.displayName = 'ImageAvatar';

const Fallback = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const { alt } = useRootContext();
    const status = useRootStoreContext((state) => state.status);

    if (status !== 'error') {
      return null;
    }
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role={'img'} aria-label={alt} {...props} />;
  }
);

Fallback.displayName = 'FallbackAvatar';

export { Fallback, Image, Root };
