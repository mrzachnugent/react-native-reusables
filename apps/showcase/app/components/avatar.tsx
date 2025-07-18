import { View } from 'react-native';
import { AvatarPreview } from '@showcase/components/styles/examples';

export default function AvatarScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <AvatarPreview />
    </View>
  );
}
