import { View } from 'react-native';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

export default function AlertDialogScreen() {
  return (
    <View className='flex-1 justify-center items-center p-8 gap-12'>
      <AlertDialog className='w-full max-w-xl'>
        <AlertDialogTrigger>Fade In</AlertDialogTrigger>
        <AlertDialogContent className='w-full max-w-xl'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog className='w-full max-w-xl'>
        <AlertDialogTrigger variant='secondary'>Slide In</AlertDialogTrigger>
        <AlertDialogContent animationType='slide' className='w-full max-w-xl'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex-col'>
            <AlertDialogAction className='w-full'>Continue</AlertDialogAction>
            <AlertDialogCancel className='w-full'>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
