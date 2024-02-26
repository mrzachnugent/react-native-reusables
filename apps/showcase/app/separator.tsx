import { View } from 'react-native';
import { Separator } from '~/components/ui/separator';
import { H4, P, Small } from '~/components/ui/typography';

export default function SeparatorScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='w-full max-w-xs '>
        <View className='gap-1'>
          <H4 className='text-sm native:text-base font-medium leading-none'>Radix Primitives</H4>
          <P className='text-sm native:text-base text-muted-foreground'>
            An open-source UI component library.
          </P>
        </View>
        <Separator className='my-4' />
        <View className='flex flex-row h-5 items-center gap-4 '>
          <Small className='font-normal'>Blog</Small>
          <Separator orientation='vertical' />
          <Small className='font-normal'>Docs</Small>
          <Separator orientation='vertical' />
          <Small className='font-normal'>Source</Small>
        </View>
      </View>
    </View>
  );
}
