import { ChevronsUpDown } from 'lucide-react-native';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleHeader,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { cn } from '~/lib/utils';

export default function CollapsibleScreen() {
  return (
    <View className='flex-1 justify-center p-6'>
      <Collapsible>
        <CollapsibleHeader>
          <Text className='text-lg font-semibold text-foreground'>
            @peduarte starred 3 repositories
          </Text>
          <CollapsibleTrigger>
            {({ pressed }) => {
              return (
                <ChevronsUpDown
                  size={20}
                  className={cn('text-foreground', pressed && 'opacity-70')}
                />
              );
            }}
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <View className='rounded-md bg-secondary border border-border px-4 py-3'>
          <Text className='font-mono text-base text-foreground'>
            @radix-ui/primitives
          </Text>
        </View>
        <CollapsibleContent>
          <Animated.View
            entering={FadeInDown.delay(150)}
            className='rounded-md bg-secondary border border-border px-4 py-3'
          >
            <Text className='font-mono text-base text-foreground'>
              @radix-ui/colors
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(250)}
            className='rounded-md bg-secondary border border-border px-4 py-3'
          >
            <Text className='font-mono text-base text-foreground'>
              @stitches/react
            </Text>
          </Animated.View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}
