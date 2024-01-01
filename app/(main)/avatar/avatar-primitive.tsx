import { Text, View } from 'react-native';
import * as Avatar from '~/lib/rn-primitives/avatar';

const AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function AvatarPrimitiveScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Avatar.Root className='w-32 h-32 justify-center items-center relative'>
        <Avatar.Image
          className='w-full h-full'
          source={{ uri: AVATAR_URI }}
          alt="Zach Nugent's Avatar"
        />
        <Avatar.Fallback>
          <Text className='text-foreground text-3xl'>ZN</Text>
        </Avatar.Fallback>
      </Avatar.Root>
    </View>
  );
}
