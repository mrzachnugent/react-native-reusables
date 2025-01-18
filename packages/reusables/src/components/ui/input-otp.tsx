import * as React from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import Animated, { withRepeat, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { cn } from '../../lib/utils';
import { Input } from './input';

interface InputOTPProps extends ViewProps {
  value?: string;
  maxLength?: number;
  onValueChange?: (value: string) => void;
  pattern?: RegExp;
  separator?: React.ReactNode;
  containerClassName?: string;
  onBlur?: () => void;
  groupSize?: number; // Size of each group (e.g., 2 for XX-XX-XX format)
}

const InputOTP = React.forwardRef<React.ElementRef<typeof View>, InputOTPProps>(
  (
    {
      className,
      containerClassName,
      value = '',
      maxLength = 6,
      pattern = /^[0-9]$/,
      onValueChange,
      separator = '-',
      groupSize = 1,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const inputRef = React.useRef<React.ElementRef<typeof Input>>(null);

    const handlePress = () => {
      inputRef.current?.focus();
    };

    const handleChangeText = (text: string) => {
      if (text.length <= maxLength && text.split('').every((char) => pattern.test(char))) {
        onValueChange?.(text);
      }
    };

    const handleBlur = () => {
      setFocused(false);
      onBlur?.();
    };

    // Create groups of digits based on groupSize
    const renderSlots = () => {
      const slots = [];
      for (let i = 0; i < maxLength; i++) {
        // Add separator between groups
        if (i > 0 && i % groupSize === 0 && separator) {
          slots.push(
            <Text key={`sep-${i}`} className='text-muted-foreground px-0.5'>
              {separator}
            </Text>
          );
        }
        
        slots.push(
          <InputOTPSlot
            key={i}
            char={value[i]}
            focused={focused && value.length === i}
            filledCharacters={value.length}
          />
        );
      }
      return slots;
    };

    return (
      <View
        ref={ref}
        className={cn('flex flex-row items-center justify-center', containerClassName)}
        {...props}
      >
        <Input
          ref={inputRef}
          className='absolute opacity-0 w-0 h-0'
          maxLength={maxLength}
          keyboardType='number-pad'
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        />
        <Pressable onPress={handlePress}>
          <View className='flex flex-row items-center'>{renderSlots()}</View>
        </Pressable>
      </View>
    );
  }
);

InputOTP.displayName = 'InputOTP';

interface InputOTPSlotProps extends ViewProps {
  char?: string;
  focused?: boolean;
  filledCharacters: number;
}

const InputOTPSlot = React.forwardRef<React.ElementRef<typeof View>, InputOTPSlotProps>(
  ({ className, char, focused, filledCharacters, ...props }, ref) => {
    const animatedStyle = useAnimatedStyle(() => {
      if (!focused) return { opacity: 0 };
      
      return {
        opacity: withRepeat(
          withSequence(
            withTiming(1, { duration: 500 }),
            withTiming(0, { duration: 500 })
          ),
          -1,
          true
        ),
      };
    }, [focused]);

    return (
      <View
        ref={ref}
        className={cn(
          'relative h-12 w-10 rounded-md border border-input bg-background mx-0.5',
          focused && 'border-2 border-primary',
          className
        )}
        {...props}
      >
        {char ? (
          <Text className='absolute inset-0 text-center text-lg leading-[40px] text-foreground'>
            {char}
          </Text>
        ) : (
          <Animated.View
            style={[animatedStyle]}
            className='absolute top-3 bottom-3 left-1/2 w-0.5 -translate-x-1/2 bg-primary'
          />
        )}
      </View>
    );
  }
);

InputOTPSlot.displayName = 'InputOTPSlot';

export { InputOTP }; 