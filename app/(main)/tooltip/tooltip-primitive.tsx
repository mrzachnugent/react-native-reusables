import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Tooltip from '~/components/primitives/tooltip';

export default function TooltipPrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Tooltip.Root open={open} onOpenChange={setOpen}>
          <Tooltip.Trigger className='bg-secondary w-10 h-10 justify-center items-center rounded-full'>
            <Text className='text-foreground text-xl italic font-bold'>i</Text>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Overlay style={StyleSheet.absoluteFill}>
              <Tooltip.Content
                sideOffset={6}
                insets={contentInsets}
                className='bg-muted p-2'
              >
                <Text className='text-foreground text-xl'>
                  Some information
                </Text>
              </Tooltip.Content>
            </Tooltip.Overlay>
          </Tooltip.Portal>
        </Tooltip.Root>
      </View>
    </>
  );
}
