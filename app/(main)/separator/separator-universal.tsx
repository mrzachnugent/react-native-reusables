import { View } from 'react-native';
import { Separator } from '~/components/ui/separator';
import * as Typo from '~/components/ui/typography';

export default function SeparatorUniversalScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='w-full max-w-xs '>
        <View className='gap-1'>
          <Typo.H4 className='text-sm native:text-base font-medium leading-none'>
            Radix Primitives
          </Typo.H4>
          <Typo.P className='text-sm native:text-base text-muted-foreground'>
            An open-source UI component library.
          </Typo.P>
        </View>
        <Separator className='my-4' />
        <View className='flex flex-row h-5 items-center gap-4 '>
          <Typo.Small className='font-normal'>Blog</Typo.Small>
          <Separator orientation='vertical' />
          <Typo.Small className='font-normal'>Docs</Typo.Small>
          <Separator orientation='vertical' />
          <Typo.Small className='font-normal'>Source</Typo.Small>
        </View>
      </View>
    </View>
  );
}
