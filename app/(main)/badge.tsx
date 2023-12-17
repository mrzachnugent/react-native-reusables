import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';

export default function BadgeScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Badge>Badge</Badge>
      <Badge variant={'secondary'}>Badge</Badge>
      <Badge variant={'destructive'}>Badge</Badge>
      <Badge variant={'outline'}>Badge</Badge>
    </View>
  );
}
