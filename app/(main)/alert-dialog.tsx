import { View } from 'react-native';
import { AlertDialog } from '~/components/ui/alert-dialog';

export default function AlertDialogScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <AlertDialog />
    </View>
  );
}
