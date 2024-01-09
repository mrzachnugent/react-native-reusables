import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import * as Avatar from '~/lib/rn-primitives/native/avatar';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';
const TWITTER_AVATAR_URI =
  'https://pbs.twimg.com/profile_images/1343607502756306944/-xmv83Pk_400x400.jpg';

// Caution with NativeWind v4 and Expo Image: Must set width and height through `style` for now
// https://github.com/marklawlor/nativewind/issues/680

export default function AvatarPrimitiveScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Avatar.Root
        alt="Zach Nugent's Avatar with expo-image"
        className='w-32 h-32 justify-center items-center relative'
      >
        <Avatar.Image
          className='w-full h-full'
          source={{ uri: GITHUB_AVATAR_URI }}
          asChild
        >
          <Image style={{ height: 112, width: 112 }} />
        </Avatar.Image>
        <Avatar.Fallback>
          <Text className='text-foreground text-3xl'>ZN</Text>
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root
        alt="Zach Nugent's Avatar"
        className='w-32 h-32 justify-center items-center relative'
      >
        <Avatar.Image
          className='w-full h-full'
          source={{ uri: TWITTER_AVATAR_URI }}
        />
        <Avatar.Fallback>
          <Text className='text-foreground text-3xl'>ZN</Text>
        </Avatar.Fallback>
      </Avatar.Root>
    </View>
  );
}
