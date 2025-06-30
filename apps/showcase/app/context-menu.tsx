import { ContextMenuTrigger } from '@/components/ui/context-menu';
import { ContextMenuPreview } from '@/examples/context-menu';
import * as React from 'react';
import { Pressable, View } from 'react-native';

export default function ContextScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof ContextMenuTrigger>>(null);

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Pressable
          className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
          onPress={() => {
            // Only for Native platforms: open menu programmatically
            triggerRef.current?.open();
          }}
        />
        <ContextMenuPreview />
      </View>
    </>
  );
}
