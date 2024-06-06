import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Text } from '~/components/ui/text';
import { CalendarDays } from '~/lib/icons/CalendarDays';

export default function HoverCardScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof HoverCardTrigger>>(null);
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
        <Pressable
          className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
          onPress={() => {
            // open programmatically
            triggerRef.current?.open();
          }}
        />
        <HoverCard>
          <HoverCardTrigger ref={triggerRef} asChild>
            <Button variant='link' size='lg'>
              <Text>@nextjs</Text>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent insets={contentInsets} className='w-80 native:w-96'>
            <View className='flex flex-row justify-between gap-4'>
              <Avatar alt='Vercel avatar'>
                <AvatarImage source={{ uri: 'https://github.com/vercel.png' }} />
                <AvatarFallback>
                  <Text>VA</Text>
                </AvatarFallback>
              </Avatar>
              <View className='gap-1 flex-1'>
                <Text className='text-sm native:text-base font-semibold'>@nextjs</Text>
                <Text className='text-sm native:text-base'>
                  The React Framework – created and maintained by @vercel.
                </Text>
                <View className='flex flex-row items-center pt-2 gap-2'>
                  <CalendarDays size={14} className='text-foreground opacity-70' />
                  <Text className='text-xs native:text-sm text-muted-foreground'>
                    Joined December 2021
                  </Text>
                </View>
              </View>
            </View>
          </HoverCardContent>
        </HoverCard>
      </View>
    </>
  );
}
