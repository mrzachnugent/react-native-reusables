import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
  Animated
} from 'react-native';
import { cn } from '../../lib/utils';

interface InputOTPProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
}

const InputOTP = React.forwardRef<TextInput, InputOTPProps>(
  ({ value, onChange, length = 6, className, ...props }, ref) => {
    const [focusedIndex, setFocusedIndex] = React.useState<number>(0);
    const inputRef = React.useRef<TextInput>(null);
    const caretAnim = React.useRef(new Animated.Value(0)).current;

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(caretAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(caretAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    const handlePress = () => {
      inputRef.current?.focus();
      setFocusedIndex(value.length);
    };

    const handleChange = (text: string) => {
      const newValue = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange(newValue);
      setFocusedIndex(newValue.length);
    };

    return (
      <View className={cn('flex-row justify-center items-center gap-2', className)}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={length}
          className="absolute opacity-0"
          {...props}
        />
        {Array.from({ length }).map((_, index) => (
          <View
            key={index}
            className={cn(
              'w-12 h-16 border rounded-md justify-center items-center',
              focusedIndex === index
                ? 'border-primary bg-background'
                : 'border-input bg-muted'
            )}
            onTouchEnd={handlePress}
          >
            <React.Fragment>
              <Text className="text-lg font-medium text-foreground">
                {value[index] || ''}
              </Text>
              {focusedIndex === index && (
                <Animated.View
                  style={[
                    styles.caret,
                    {
                      opacity: caretAnim,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          </View>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  caret: {
    position: 'absolute',
    width: 2,
    height: 24,
    backgroundColor: 'hsl(var(--foreground))',
  },
});

InputOTP.displayName = 'InputOTP';

export { InputOTP }; 
