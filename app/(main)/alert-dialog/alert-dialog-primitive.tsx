import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import * as AlertDialog from '~/lib/rn-primitives/alert-dialog';

export default function AlertDialogPrimitiveScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Text className='text-foreground text-xl'>Open alert dialog</Text>
        </AlertDialog.Trigger>
        <AlertDialog.Portal className='flex-1 justify-center items-center'>
          <AlertDialog.Overlay
            style={StyleSheet.absoluteFill}
            className='bg-zinc-50/80 dark:bg-zinc-900/80 justify-center items-center'
          >
            <AlertDialog.Content className='bg-background'>
              <AlertDialog.Title className='text-foreground text-xl'>
                TITLE
              </AlertDialog.Title>
              <AlertDialog.Description className='text-foreground text-xl'>
                DESCRIPTION
              </AlertDialog.Description>
              <AlertDialog.Close>
                <Text className='text-foreground text-xl'>Close</Text>
              </AlertDialog.Close>
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
