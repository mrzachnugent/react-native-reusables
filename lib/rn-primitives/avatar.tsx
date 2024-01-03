import React from 'react';
import {
  ImageErrorEventData,
  ImageLoadEventData,
  NativeSyntheticEvent,
  Image as RNImage,
  View,
} from 'react-native';
import { ImageSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface AvatarRootProps {
  alt: string;
}

type AvatarState = 'loading' | 'error' | 'loaded';

interface RootContext extends AvatarRootProps {
  status: AvatarState;
  setStatus: React.Dispatch<React.SetStateAction<AvatarState>>;
}

const AvatarContext = React.createContext({} as RootContext);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & AvatarRootProps
>(({ asChild, alt, ...viewProps }, ref) => {
  const [status, setStatus] = React.useState<AvatarState>('loading');
  const Slot = asChild ? ViewSlot : View;
  return (
    <AvatarContext.Provider
      value={{
        status,
        setStatus,
        alt,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </AvatarContext.Provider>
  );
});

Root.displayName = 'RootAvatar';

function useAvatarContext() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error(
      'Avatar compound components cannot be rendered outside the Avatar component'
    );
  }
  return context;
}

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
    const { status, alt, setStatus } = useAvatarContext();

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
  const { status, alt } = useAvatarContext();

  if (status !== 'error') {
    return null;
  }
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role={'img'} aria-label={alt} {...props} />;
});

Fallback.displayName = 'FallbackAvatar';

export { Fallback, Image, Root };
