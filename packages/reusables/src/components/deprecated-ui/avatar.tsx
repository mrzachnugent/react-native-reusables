import * as React from 'react';
import { Image, ImageErrorEventData, NativeSyntheticEvent, Text, View } from 'react-native';

import { cn } from '../../lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);

  function onError(error: NativeSyntheticEvent<ImageErrorEventData>) {
    setHasError(!!error);
  }

  if (hasError) {
    return null;
  }
  return (
    <Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      onError={onError}
      {...props}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & { textClass?: string }
>(({ children, textClass, className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    role='img'
    {...props}
  >
    <Text className={cn('text-lg text-foreground', textClass)}>{children}</Text>
  </View>
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
