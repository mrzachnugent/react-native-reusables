import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import * as Dialog from '~/lib/rn-primitives/dialog';

export default function DialogPrimitiveScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Dialog.Root>
        <Dialog.Trigger>
          <Text className='text-foreground text-xl'>Open dialog</Text>
        </Dialog.Trigger>
        <Dialog.Portal className='flex-1 justify-center items-center'>
          <Dialog.Overlay
            style={StyleSheet.absoluteFill}
            className='bg-zinc-50/80 dark:bg-zinc-900/80 justify-center items-center'
          >
            <Dialog.Content className='bg-background'>
              <Dialog.Title className='text-foreground text-xl'>
                TITLE
              </Dialog.Title>
              <Dialog.Description className='text-foreground text-xl'>
                DESCRIPTION
              </Dialog.Description>
              <Dialog.Close>
                <Text className='text-foreground text-xl'>Close</Text>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </ScrollView>
  );
}
