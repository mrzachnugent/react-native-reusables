import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

export default function AlertScreen() {
  return (
    <View className='flex-1 justify-center p-6 items-center gap-6'>
      <Alert icon='Terminal'>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can use a terminal to run commands on your computer.
        </AlertDescription>
      </Alert>
      <Alert icon='AlertTriangle' variant='destructive'>
        <AlertTitle>Danger!</AlertTitle>
        <AlertDescription>
          High voltage. Do not touch. Risk of electric shock. Keep away from
          children.
        </AlertDescription>
      </Alert>
      <Alert icon='CheckSquare' variant='success'>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          You have successfully completed the tutorial. You can now go touch
          some grass.
        </AlertDescription>
      </Alert>
    </View>
  );
}
