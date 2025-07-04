import { Avatar, AvatarFallback, AvatarImage } from '@/registry/default/components/ui/avatar';
import { Button } from '@/registry/default/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/registry/default/components/ui/hover-card';
import { Text } from '@/registry/default/components/ui/text';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HoverCardPreview() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>
          <Text>@nextjs</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent insets={contentInsets} className='w-80'>
        <View className='flex flex-row justify-between gap-4'>
          <Avatar alt='Vercel avatar'>
            <AvatarImage source={{ uri: 'https://github.com/vercel.png' }} />
            <AvatarFallback>
              <Text>VC</Text>
            </AvatarFallback>
          </Avatar>
          <View className='gap-1 flex-1'>
            <Text className='text-sm font-semibold'>@nextjs</Text>
            <Text className='text-sm'>
              The React Framework – created and maintained by @vercel.
            </Text>
            <Text className='text-muted-foreground text-xs'>Joined December 2021</Text>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  );
}
