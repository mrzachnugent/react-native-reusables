import { View } from 'react-native';
import { Tooltip } from '~/components/ui/tooltip';

export default function TooltipScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Tooltip />
    </View>
  );
}
