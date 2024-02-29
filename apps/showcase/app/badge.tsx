import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';

export default function BadgeScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Badge>
        <Text>Default</Text>
      </Badge>
      <Badge variant={'secondary'}>
        <Text>Secondary</Text>
      </Badge>
      <Badge variant={'destructive'}>
        <Text>Destructive</Text>
      </Badge>
      <Badge variant={'outline'}>
        <Text>Outline</Text>
      </Badge>
    </View>
  );
}
