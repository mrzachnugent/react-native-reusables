import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { InputOTP } from '~/components/ui/input-otp';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

export default function InputOTPScreen() {
  const [value1, setValue1] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = React.useState<string | null>(null);

  // Check OTP whenever value changes
  React.useEffect(() => {
    if (value1.length === 6) {
      if (value1 === '123456') {
        setStatus('success');
        setMessage('OTP verified successfully!');
      } else {
        setStatus('error');
        setMessage('Invalid OTP code. Please try again.');
      }
    } else {
      setStatus('idle');
      setMessage(null);
    }
  }, [value1]);

  const handleValueChange = (text: string) => {
    setValue1(text);
  };

  return (
    <ScrollView contentContainerClassName='flex-1 justify-center items-center p-6'>
      <View className='w-full max-w-sm space-y-4'>
        {/* Single character grouping (1-2-3-4-5-6) */}
        <View>
          <Label
            className={cn(
              status === 'error' && 'text-destructive',
              status === 'success' && 'text-emerald-500',
              'pb-2 native:pb-1 pl-0.5'
            )}
            nativeID='otpLabel1'
          >
            Enter verification code
          </Label>
          <Text className='text-muted-foreground text-sm pb-4'>
            Enter a 6-digit code. Try "123456" for success.
          </Text>
          
          <InputOTP
            value={value1}
            onValueChange={handleValueChange}
            maxLength={6}
            separator="-"
            groupSize={3}
            aria-labelledby='otpLabel1'
            aria-errormessage='otpMessage'
            containerClassName={cn(
              status === 'error' && 'animate-shake',
              status === 'success' && 'animate-pulse',
              'justify-start'
            )}
          />
        </View>

        {message && (
          <View className='pt-2'>
            <Text
              className={cn(
                'text-sm px-1 py-1.5',
                status === 'error' && 'text-destructive',
                status === 'success' && 'text-emerald-500'
              )}
              aria-invalid={status === 'error'}
              id='otpMessage'
            >
              {message}
            </Text>
          </View>
        )}

        <View className='pt-4 space-y-2'>
          <Text className='text-emerald-400 text-sm'>
            Set OTP as 123456 for success message
          </Text>
          <Text className='text-red-400 text-sm'>
            Any other 6-digit code will show error
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
