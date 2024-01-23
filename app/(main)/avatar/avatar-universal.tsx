import { View } from 'react-native';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/universal-ui/avatar';
import { Text } from '~/components/universal-ui/typography';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function AvatarPrimitiveScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Avatar alt="Zach Nugent's Avatar">
        <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
