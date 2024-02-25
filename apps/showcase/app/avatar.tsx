import { View } from 'react-native';
import { Ui } from '@rnr/reusables';

const { Avatar, AvatarFallback, AvatarImage, Text } = Ui;

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function AvatarScreen() {
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
