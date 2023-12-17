import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

const AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function AvatarScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Avatar className='w-32 h-32'>
        <AvatarImage source={{ uri: AVATAR_URI }} />
        <AvatarFallback textClass='text-3xl'>CN</AvatarFallback>
      </Avatar>
    </View>
  );
}
