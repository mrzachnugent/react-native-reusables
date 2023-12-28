import { ChevronsUpDown } from 'lucide-react-native';
import { Platform, Text, View } from 'react-native';
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
    <View className='flex-1 justify-center items-center p-6'>
      <Collapsible className='w-full max-w-xl'>
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
        <View className='rounded-md bg-secondary border border-border px-4 h-12 justify-center'>
          <Text className='ios:font-mono text-base text-foreground'>
            @radix-ui/primitives
          </Text>
        </View>
        <CollapsibleContent style={{ gap: 12 }}>
          <CollapsibleChild entering={FadeInDown.delay(150)}>
            @radix-ui/colors
          </CollapsibleChild>
          <CollapsibleChild entering={FadeInDown.delay(250)}>
            @stitches/react
          </CollapsibleChild>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}

// Temporary workaround for Animated.View not working on web
function CollapsibleChild({
  children,
  entering,
}: {
  children: string;
  entering: React.ComponentProps<typeof Animated.View>['entering'];
}) {
  if (Platform.OS === 'web') {
    return (
      <View className='rounded-md bg-secondary border border-border px-4 h-12 justify-center'>
        <Text className='ios:font-mono text-base text-foreground'>
          {children}
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      entering={entering}
      className='rounded-md bg-secondary border border-border px-4 h-12 justify-center'
    >
      <Text className='ios:font-mono text-base text-foreground'>
        {children}
      </Text>
    </Animated.View>
  );
}
