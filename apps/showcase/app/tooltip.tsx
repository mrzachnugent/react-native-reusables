import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

export default function TooltipScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof TooltipTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Pressable
        className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <Tooltip delayDuration={150}>
        <TooltipTrigger ref={triggerRef} asChild>
          <Button variant='outline'>
            <Text>{Platform.OS === 'web' ? 'Hover me' : 'Press me'}</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent insets={contentInsets}>
          <Text className='native:text-lg'>Add to library</Text>
        </TooltipContent>
      </Tooltip>
    </View>
  );
}
