import { cn } from '@deprecated/lib/utils';
import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { Platform } from 'react-native';

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: LabelPrimitive.TextProps & {
  ref?: React.RefObject<LabelPrimitive.TextRef>;
}) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'flex flex-row items-center gap-2 select-none',
        Platform.select({
          web: 'leading-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        }),
        disabled && 'opacity-50'
      )}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
    >
      <LabelPrimitive.Text
        className={cn('text-foreground text-sm leading-none font-medium', className)}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
