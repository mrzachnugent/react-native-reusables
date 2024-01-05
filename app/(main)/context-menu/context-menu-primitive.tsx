import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ContextMenu from '~/lib/rn-primitives/context-menu';
import { PortalHost } from '~/lib/rn-primitives/portal';
import { useHeaderHeight } from '@react-navigation/elements';

export default function ContextPrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  insets.right = 22;
  insets.left = 22;
  const headerHeight = useHeaderHeight();
  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <ContextMenu.Root open={open} onOpenChange={setOpen} className='w-full'>
          <ContextMenu.Trigger className='p-8 border border-dashed rounded-xl border-sky-500 bg-sky-100/20'>
            <Text className='text-foreground text-xl text-center'>
              Root Portal ContextMenu
            </Text>
            <Text className='text-foreground font-bold text-center'>
              LONG PRESS WITHIN DASHED BORDER
            </Text>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Overlay className='bg-sky-500/10' />
            <ContextMenu.Content
              align='start'
              insets={insets}
              className='bg-background'
            >
              <Text className='text-foreground text-xl'>TITLE</Text>
              <Text className='text-foreground text-xl'>DESCRIPTION</Text>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>
        <ContextMenu.Root open={open} onOpenChange={setOpen} className='w-full'>
          <ContextMenu.Trigger className='p-8 border border-dashed rounded-xl border-sky-500 bg-sky-100/20'>
            <Text className='text-foreground text-xl text-center'>
              Inner Portal ContextMenu
            </Text>
            <Text className='text-foreground font-bold text-center'>
              LONG PRESS WITHIN DASHED BORDER
            </Text>
          </ContextMenu.Trigger>
          <ContextMenu.Portal hostName='inner'>
            <ContextMenu.Overlay className='bg-sky-500/10' />
            <ContextMenu.Content
              align='center'
              sideOffset={-headerHeight}
              insets={insets}
              className='bg-background'
            >
              <Text className='text-foreground text-xl'>TITLE</Text>
              <Text className='text-foreground text-xl'>DESCRIPTION</Text>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>
        <PortalHost name='inner' />
      </View>
    </>
  );
}
