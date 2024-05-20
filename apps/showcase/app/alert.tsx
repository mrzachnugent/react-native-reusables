import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertTriangle } from '~/lib/icons/AlertTriangle';
import { Terminal } from '~/lib/icons/Terminal';

export default function AlertScreen() {
  return (
    <View className='flex-1 justify-center p-6 items-center gap-6'>
      <Alert icon={Terminal} className='max-w-xl'>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can use a terminal to run commands on your computer.
        </AlertDescription>
      </Alert>
      <Alert icon={AlertTriangle} variant='destructive' className='max-w-xl'>
        <AlertTitle>Danger!</AlertTitle>
        <AlertDescription>
          High voltage. Do not touch. Risk of electric shock. Keep away from children.
        </AlertDescription>
      </Alert>
    </View>
  );
}
