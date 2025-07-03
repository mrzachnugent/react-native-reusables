import { Separator } from '@/new-york/components/ui/separator';
import { Text } from '@/new-york/components/ui/text';
import { View } from 'react-native';

export function SeparatorPreview() {
  return (
    <View>
      <View className='gap-1'>
        <Text className='text-sm leading-none font-medium'>Radix Primitives</Text>
        <Text className='text-sm text-muted-foreground'>An open-source UI component library.</Text>
      </View>
      <Separator className='my-4' />
      <View className='flex flex-row h-5 items-center gap-4 '>
        <Text className='text-sm'>Blog</Text>
        <Separator orientation='vertical' />
        <Text className='text-sm'>Docs</Text>
        <Separator orientation='vertical' />
        <Text className='text-sm'>Source</Text>
      </View>
    </View>
  );
}
