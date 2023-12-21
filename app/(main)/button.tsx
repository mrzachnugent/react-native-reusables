import { View } from 'react-native';
import { Button } from '~/components/ui/button';

export default function ButtonScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6'>
      <Button className='w-full'>Default</Button>
      <Button variant='destructive' className='w-full'>
        Destructive
      </Button>
      <Button variant='secondary' className='w-full'>
        Secondary
      </Button>
      <Button variant='outline' size='lg'>
        Outline lg
      </Button>
      <Button variant='ghost' size='lg'>
        Ghost lg
      </Button>
      <Button variant='link' size='sm'>
        Link sm
      </Button>
    </View>
  );
}
