import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CalendarDays } from 'lucide-react-native';
import { View } from 'react-native';

// TODO(zach): use only 1 component for hover card

export function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link' size='lg'>
          <Text>@nextjs</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80 native:w-96'>
        <View style={{ width: 320 }} className='flex flex-row justify-between gap-4'>
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
              <Icon as={CalendarDays} size={14} className='text-foreground opacity-70' />
              <Text className='text-xs native:text-sm text-muted-foreground'>
                Joined December 2021
              </Text>
            </View>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  );
}
