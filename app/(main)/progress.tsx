import { View } from 'react-native';
import { Progress } from '~/components/ui/progress';

export default function ProgressScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Progress />
    </View>
  );
}
