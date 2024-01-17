import { View } from 'react-native';
import { Badge, BadgeText } from '~/components/universal-ui/badge';

export default function BadgeUniversalScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Badge>
        <BadgeText>Default</BadgeText>
      </Badge>
      <Badge variant={'secondary'}>
        <BadgeText>Secondary</BadgeText>
      </Badge>
      <Badge variant={'destructive'}>
        <BadgeText>Destructive</BadgeText>
      </Badge>
      <Badge variant={'outline'}>
        <BadgeText>Outline</BadgeText>
      </Badge>
    </View>
  );
}
