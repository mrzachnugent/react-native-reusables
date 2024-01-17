import { View } from 'react-native';
import { Button, ButtonText } from '~/components/universal-ui/button';

export default function ButtonUniversalScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Button>
        <ButtonText>Default</ButtonText>
      </Button>
      <Button variant='destructive'>
        <ButtonText>Destructive</ButtonText>
      </Button>
      <Button variant='destructive' disabled>
        <ButtonText>Destructive disabled</ButtonText>
      </Button>
      <Button variant='secondary'>
        <ButtonText>Secondary</ButtonText>
      </Button>
      <Button variant='outline' size='lg'>
        <ButtonText>Outline lg</ButtonText>
      </Button>
      <Button variant='outline' size='sm'>
        <ButtonText>Outline sm</ButtonText>
      </Button>
      <Button variant='ghost'>
        <ButtonText>Ghost</ButtonText>
      </Button>
      <Button variant='link' size='sm'>
        <ButtonText>Link sm</ButtonText>
      </Button>
    </View>
  );
}
