import * as React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Text } from '~/components/ui/text';

export default function TooltipScreen() {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Tooltip open={open} onOpenChange={setOpen} delayDuration={150}>
        <TooltipTrigger asChild>
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
