import { View } from 'react-native';
import { Button } from '~/components/ui/button';

export default function ButtonScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6'>
      <Button size='wide'>Default</Button>
      <Button variant='destructive' size='wide'>
        Destructive
      </Button>
      <Button variant='secondary' className='w-full'>
        Secondary
      </Button>
      <Button variant='outline' size='lg'>
        Outline
      </Button>
      <Button variant='ghost' size='lg'>
        Ghost
      </Button>
      <Button variant='link' size='sm'>
        Link
      </Button>
    </View>
  );
}
