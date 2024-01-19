import { ChevronsUpDown } from 'lucide-react-native';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Button } from '~/components/universal-ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/universal-ui/collapsible';

export default function CollapsibleUniversalScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center'>
      <Collapsible open={open} onOpenChange={setOpen} asChild>
        <Animated.View layout={Layout}>
          <View className='w-[350px] gap-2'>
            <View className='flex flex-row items-center justify-between space-x-4 px-4'>
              <Text className='text-foreground text-sm font-semibold'>
                @peduarte starred 3 repositories
              </Text>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='sm' className='w-9 p-0 '>
                  <ChevronsUpDown size={16} className='text-foreground' />
                  <Text className='sr-only'>Toggle</Text>
                </Button>
              </CollapsibleTrigger>
            </View>
            <View className='rounded-md border border-border px-4 py-3 '>
              <Text className='text-foreground text-sm'>
                @radix-ui/primitives
              </Text>
            </View>
            <CollapsibleContent className='gap-2'>
              <CollapsibleItem delay={100}>@radix-ui/react</CollapsibleItem>
              <CollapsibleItem delay={200}>@stitches/core</CollapsibleItem>
            </CollapsibleContent>
          </View>
        </Animated.View>
      </Collapsible>
    </View>
  );
}

function CollapsibleItem({
  children,
  delay,
}: {
  children: string;
  delay: number;
}) {
  if (Platform.OS === 'web') {
    return (
      <View className='rounded-md border border-border px-4 py-3'>
        <Text className='text-foreground text-sm'>{children}</Text>
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(200).delay(delay)}
      className='rounded-md border border-border px-4 py-3'
    >
      <Text className='text-foreground text-sm'>{children}</Text>
    </Animated.View>
  );
}
