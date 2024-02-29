import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';

export default function ModalScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='p-4 native:pb-24 max-w-md gap-6'>
        <View className='gap-1'>
          <H1 className='text-foreground text-center'>Create an account</H1>
          <Muted className='text-base text-center'>
            Enter you email below to create your account
          </Muted>
        </View>
        <Input placeholder='name@example.com' />
        <View className='flex-row items-center gap-3'>
          <View className='flex-1 h-px bg-muted' />
          <Muted>OR CONTINUE WITH</Muted>
          <View className='flex-1 h-px bg-muted' />
        </View>
        <Button>
          <Text>Github</Text>
        </Button>
        <View>
          <Muted className='text-center'>
            By creating an account, you agree to our{' '}
            <Muted className='underline'>Terms of Service</Muted> and{' '}
            <Muted className='underline'>Privacy Policy</Muted>
          </Muted>
        </View>
      </View>
    </View>
  );
}
