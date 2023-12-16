import { View } from 'react-native';
import { Toast } from '~/components/ui/toast';

export default function ToastScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Toast />
    </View>
  );
}
