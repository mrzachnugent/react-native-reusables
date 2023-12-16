import { View } from 'react-native';
import { Alert } from '~/components/ui/alert';

export default function AlertScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Alert />
    </View>
  );
}
