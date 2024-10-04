import * as React from 'react';
import { View } from 'react-native';
import { InputOtp } from '~/components/ui/input-otp';
import { Bold } from '~/lib/icons/Bold';

export default function InputOtpScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <InputOtp aria-label='OTP' placeholder='OTP' />
    </View>
  );
}
