import { atom, useAtom, useAtomValue } from 'jotai';
import React from 'react';
import {
  ImageErrorEventData,
  ImageLoadEventData,
  NativeSyntheticEvent,
  Image as RNImage,
  View,
} from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { ImageSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface AvatarRootProps {
  alt: string;
}

interface RootAtom extends AvatarRootProps {
  status: 'loading' | 'error' | 'loaded';
}
const rootAtom = atom({} as RootAtom);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & AvatarRootProps
>(({ asChild, alt, ...viewProps }, ref) => {
  const Slot = asChild ? ViewSlot : View;
  return (
    <AtomScopeProvider
      atom={rootAtom}
      value={{
        status: 'loading',
        alt,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </AtomScopeProvider>
  );
});

Root.displayName = 'RootAvatar';

const Image = React.forwardRef<
  React.ElementRef<typeof RNImage>,
  Omit<ComponentPropsWithAsChild<typeof RNImage>, 'alt'> & {
    children?: React.ReactNode;
    onLoadingStatusChange?: (status: 'error' | 'loaded') => void;
  }
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
    const [{ status, alt }, setRoot] = useAtom(rootAtom);

    const onLoad = React.useCallback(
      (e: NativeSyntheticEvent<ImageLoadEventData>) => {
        setRoot((prev) => ({ ...prev, status: 'loaded' }));
        onLoadingStatusChange?.('loaded');
        onLoadProps?.(e);
      },
      [onLoadProps]
    );

    const onError = React.useCallback(
      (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        setRoot((prev) => ({ ...prev, status: 'error' }));
        onLoadingStatusChange?.('error');
        onErrorProps?.(e);
      },
      [onErrorProps]
    );

    if (status === 'error') {
      return null;
    }

    const Slot = asChild ? ImageSlot : RNImage;
    return (
      <Slot ref={ref} alt={alt} onLoad={onLoad} onError={onError} {...props} />
    );
  }
);

Image.displayName = 'ImageAvatar';

const Fallback = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const { status, alt } = useAtomValue(rootAtom);

  if (status !== 'error') {
    return null;
  }
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role={'img'} aria-label={alt} {...props} />;
});

Fallback.displayName = 'FallbackAvatar';

export { Fallback, Image, Root };
