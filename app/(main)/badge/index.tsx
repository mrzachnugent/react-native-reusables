import { View } from 'react-native';
import { Badge } from '~/components/old-ui/badge';

export default function BadgeScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Badge>Default</Badge>
      <Badge variant={'secondary'}>Secondary</Badge>
      <Badge size='sm' variant={'destructive'}>
        Destructive sm
      </Badge>
      <Badge size='lg' variant={'outline'}>
        Outline lg
      </Badge>
    </View>
  );
}
