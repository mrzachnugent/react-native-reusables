import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as HoverCard from '~/components/primitives/hover-card';

export default function HoverCardPrimitiveScreen() {
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
        <HoverCard.Root open={open} onOpenChange={setOpen}>
          <HoverCard.Trigger className='bg-secondary w-10 h-10 justify-center items-center rounded-full'>
            <Text className='text-foreground text-xl italic font-bold'>i</Text>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Overlay
              style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : {}}
            >
              <HoverCard.Content
                sideOffset={6}
                insets={contentInsets}
                className='bg-muted p-2'
                align='center'
              >
                <Text className='text-foreground text-xl'>
                  Some information
                </Text>
              </HoverCard.Content>
            </HoverCard.Overlay>
          </HoverCard.Portal>
        </HoverCard.Root>
      </View>
    </>
  );
}

function HoverCardOverlay({ children }: any) {
  if (Platform.OS === 'web') return <>{children}</>;
  return <View style={StyleSheet.absoluteFill}>{children}</View>;
}
