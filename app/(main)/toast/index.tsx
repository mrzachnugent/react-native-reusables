import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import Toast from 'react-native-toast-message';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

export default function ToastScreen() {
  function showSuccessToast() {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2:
        'You have successfully completed the tutorial. You can now go touch some grass.',
    });
  }
  function showErrorToast() {
    Toast.show({
      type: 'error',
      text1: 'Danger!',
      text2:
        'High voltage. Do not touch. Risk of electric shock. Keep away from children.',
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
    });
  }
  return (
    <>
      <View className='flex-1 justify-center items-center gap-5'>
        <Button onPress={showSuccessToast}>Show success toast</Button>
        <Button variant='destructive' onPress={showErrorToast}>
          Show error toast
        </Button>
        <Button variant='secondary' onPress={showBaseToast}>
          Show base toast
        </Button>
      </View>
      <View className='p-6 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </>
  );
}
