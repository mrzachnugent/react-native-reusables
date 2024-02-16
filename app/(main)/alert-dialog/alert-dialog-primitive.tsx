import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import * as AlertDialog from '~/components/primitives/alert-dialog';

export default function AlertDialogPrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className='bg-red-500 active:bg-red-900'>
          <Text className='text-foreground text-xl'>Open alert dialog</Text>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            style={StyleSheet.absoluteFill}
            className='bg-zinc-50/80 dark:bg-zinc-900/80 flex justify-center items-center'
          >
            <AlertDialog.Content className='bg-background'>
              <AlertDialog.Title className='text-foreground text-xl'>
                TITLE
              </AlertDialog.Title>
              <AlertDialog.Description className='text-foreground text-xl'>
                DESCRIPTION
              </AlertDialog.Description>
              <AlertDialog.Cancel>
                <Text className='text-foreground text-xl'>Close</Text>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Text className='text-foreground text-xl'>Action</Text>
              </AlertDialog.Action>
            </AlertDialog.Content>
          </AlertDialog.Overlay>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </ScrollView>
  );
}
