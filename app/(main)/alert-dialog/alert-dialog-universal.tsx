import React from 'react';
import { View } from 'react-native';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogActionText,
  AlertDialogCancel,
  AlertDialogCancelText,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/universal-ui/alert-dialog';
import { Button, ButtonText } from '~/components/universal-ui/button';

export default function AlertDialogUniversalScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center'>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>
            <ButtonText>Show Alert Dialog</ButtonText>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <AlertDialogCancelText>Cancel</AlertDialogCancelText>
            </AlertDialogCancel>
            <AlertDialogAction>
              <AlertDialogActionText>Continue</AlertDialogActionText>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
