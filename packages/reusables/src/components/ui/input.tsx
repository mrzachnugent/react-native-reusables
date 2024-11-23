import * as React from 'react';
import { TextInput, type TextInputProps, Platform } from 'react-native';
import { cn } from '../../lib/utils';
import { useFontScale } from '../../lib/hooks';

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
  ({ className, placeholderClassName, style, ...props }, ref) => {
    const { getScaledHeight } = useFontScale();
    // Native-only values since web uses Tailwind classes
    const baseHeight = 48; // h-12 = 48px
    const baseFontSize = 18; // text-lg = 18px

    return (
      <TextInput
        ref={ref}
        className={cn(
          'web:flex web:h-10 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        style={[
          style,
          Platform.OS !== 'web' && {
            height: getScaledHeight(baseHeight, baseFontSize),
          },
        ]}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
