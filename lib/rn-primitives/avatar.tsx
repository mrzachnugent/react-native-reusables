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
import { ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootAtom {
  status: 'loading' | 'error' | 'loaded';
}
const rootAtom = atom({} as RootAtom);

const DEFAULT_ATOM_VALUE = {
  status: 'loading',
} as const;

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...viewProps }, ref) => {
  const Slot = asChild ? ViewSlot : View;
  return (
    <AtomScopeProvider atom={rootAtom} value={DEFAULT_ATOM_VALUE}>
      <Slot ref={ref} {...viewProps} />
    </AtomScopeProvider>
  );
});

Root.displayName = 'RootAvatar';

interface ImageAtom {
  alt: string;
}
const imageAtom = atom({} as ImageAtom);

const Image = React.forwardRef<
  React.ElementRef<typeof RNImage>,
  React.ComponentPropsWithoutRef<typeof RNImage> & {
    onLoadingStatusChange?: (status: 'error' | 'loaded') => void;
    alt: string;
  }
>(
  (
    {
      onLoad: onLoadProps,
      onError: onErrorProps,
      onLoadingStatusChange,
      alt,
      ...props
    },
    ref
  ) => {
    const [{ status }, setRoot] = useAtom(rootAtom);

    const onLoad = React.useCallback(
      (e: NativeSyntheticEvent<ImageLoadEventData>) => {
        setRoot({ status: 'loaded' });
        onLoadingStatusChange?.('loaded');
        onLoadProps?.(e);
      },
      [onLoadProps]
    );

    const onError = React.useCallback(
      (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        setRoot({ status: 'error' });
        onLoadingStatusChange?.('error');
        onErrorProps?.(e);
      },
      [onErrorProps]
    );

    if (status === 'error') {
      return null;
    }

    return (
      <AtomScopeProvider atom={imageAtom} value={{ alt }}>
        <RNImage
          ref={ref}
          alt={alt}
          onLoad={onLoad}
          onError={onError}
          {...props}
        />
      </AtomScopeProvider>
    );
  }
);

Image.displayName = 'ImageAvatar';

const Fallback = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const { status } = useAtomValue(rootAtom);
  const { alt } = useAtomValue(imageAtom);

  if (status !== 'error') {
    return null;
  }
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role={'img'} aria-label={alt} {...props} />;
});

Fallback.displayName = 'FallbackAvatar';

export { Fallback, Image, Root };
