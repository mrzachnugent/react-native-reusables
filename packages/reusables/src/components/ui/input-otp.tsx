import * as React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { cn } from '../../lib/utils';

const InputOtp = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const inputRefs = React.useRef<Array<React.ElementRef<typeof TextInput> | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInputRef = inputRefs.current[index + 1];
      nextInputRef?.focus();
    }
  };

  return (
    <View className='web:flex flex-row'>
      {otp.map((value, index) => (
        <React.Fragment key={index}>
          <TextInput
            ref={(inputRef) => {
              inputRefs.current[index] = inputRef;
            }}
            className={cn(
              'web:flex h-12 justify-center align-items-center native:h-12 w-12 rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
              props.editable === false && 'opacity-50 web:cursor-not-allowed',
              className
            )}
            placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
            placeholder=''
            value={value}
            onChangeText={(text) => handleOtpChange(index, text)}
            maxLength={1}
            keyboardType='numeric'
            {...props}
          />
          <React.Fragment key={index}>
            <View className='flex justify-center '>
              {index === 2 && <Text className='text-white px-2'>-</Text>}
            </View>
          </React.Fragment>
        </React.Fragment>
      ))}
    </View>
  );
});

InputOtp.displayName = 'InputOtp';

export { InputOtp };
