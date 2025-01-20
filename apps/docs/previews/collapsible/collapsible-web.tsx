import { View } from '@/components/react-native';
import { Button } from '~/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { Text } from '~/components/ui/text';
import { ChevronsUpDown } from '~/lib/icons/ChevronsUpDown';

export function CollapsiblePreview() {
  return (
    <Collapsible style={{ width: 350 }} className='gap-2'>
      <View className='flex flex-row items-center justify-between gap-4 px-4'>
        <Text className='text-foreground text-sm native:text-lg font-semibold'>
          @peduarte starred 3 repositories
        </Text>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='icon'>
            <ChevronsUpDown size={16} className='text-foreground' />
            <Text aria-hidden className='sr-only hidden'>
              Toggle
            </Text>
          </Button>
        </CollapsibleTrigger>
      </View>
      <View className='rounded-md border border-border px-4 py-3 '>
        <Text className='text-foreground text-sm native:text-lg'>@radix-ui/primitives</Text>
      </View>
      <CollapsibleContent className='gap-2'>
        <CollapsibleItem>@radix-ui/react</CollapsibleItem>
        <CollapsibleItem>@stitches/core</CollapsibleItem>
      </CollapsibleContent>
    </Collapsible>
  );
}

function CollapsibleItem({ children }: { children: string }) {
  return (
    <View className='rounded-md border border-border px-4 py-3'>
      <Text className='text-foreground text-sm'>{children}</Text>
    </View>
  );
}
