import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

const AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function AvatarScreen() {
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <Avatar className='w-32 h-32'>
        <AvatarImage source={{ uri: AVATAR_URI }} />
        <AvatarFallback textClass='text-3xl'>ZN</AvatarFallback>
      </Avatar>
      <View className='py-4 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </View>
  );
}
