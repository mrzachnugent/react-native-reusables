import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import Toast from 'react-native-toast-message';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ToastScreen() {
  const insets = useSafeAreaInsets();
  function showSuccessToast() {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'You have successfully completed the tutorial. You can now go touch some grass.',
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  function showErrorToast() {
    Toast.show({
      type: 'error',
      text1: 'Danger!',
      text2: 'High voltage. Do not touch. Risk of electric shock. Keep away from children.',
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  function showBaseToast() {
    Toast.show({
      type: 'base',
      text1: 'Heads up!',
      text2: 'You can use a terminal to run commands on your computer.',
      props: {
        icon: 'Terminal',
      },
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  return (
    <>
      <View className='flex-1 justify-center items-center gap-5'>
        <Button onPress={showSuccessToast}>
          <Text>Show success toast</Text>
        </Button>
        <Button variant='destructive' onPress={showErrorToast}>
          <Text>Show error toast</Text>
        </Button>
        <Button variant='secondary' onPress={showBaseToast}>
          <Text>Show base toast</Text>
        </Button>
      </View>
      <View className='p-6 w-full'>
        <Alert icon='Code' className='max-w-xl mx-auto'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>This reusable does not use "rn-primitives"</AlertDescription>
        </Alert>
      </View>
    </>
  );
}
