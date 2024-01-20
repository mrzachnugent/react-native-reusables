import { CalendarDays } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/universal-ui/avatar';
import { Button, ButtonText } from '~/components/universal-ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardContentText,
  HoverCardTrigger,
} from '~/components/universal-ui/hover-card';

export default function HoverCardUniversalScreen() {
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
        <HoverCard open={open} onOpenChange={setOpen}>
          <HoverCardTrigger asChild>
            <Button variant='link' size='lg'>
              <ButtonText>@nextjs</ButtonText>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent insets={contentInsets} className='w-80 native:w-96'>
            <View className='flex flex-row justify-between gap-4'>
              <Avatar alt='Vercel avatar'>
                <AvatarImage
                  source={{ uri: 'https://github.com/vercel.png' }}
                />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <View className='gap-1 flex-1'>
                <HoverCardContentText className='text-sm native:text-base font-semibold'>
                  @nextjs
                </HoverCardContentText>
                <HoverCardContentText className='text-sm native:text-base'>
                  The React Framework – created and maintained by @vercel.
                </HoverCardContentText>
                <View className='flex flex-row items-center pt-2 gap-2'>
                  <CalendarDays
                    size={14}
                    className='text-foreground opacity-70'
                  />
                  <HoverCardContentText className='text-xs native:text-sm text-muted-foreground'>
                    Joined December 2021
                  </HoverCardContentText>
                </View>
              </View>
            </View>
          </HoverCardContent>
        </HoverCard>
      </View>
    </>
  );
}
