import { View } from 'react-native';
import { Ui } from '@rnr/reusables';

const { Separator } = Ui;

export default function SeparatorScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='w-full max-w-xs '>
        <View className='gap-1'>
          <Ui.H4 className='text-sm native:text-base font-medium leading-none'>
            Radix Primitives
          </Ui.H4>
          <Ui.P className='text-sm native:text-base text-muted-foreground'>
            An open-source UI component library.
          </Ui.P>
        </View>
        <Separator className='my-4' />
        <View className='flex flex-row h-5 items-center gap-4 '>
          <Ui.Small className='font-normal'>Blog</Ui.Small>
          <Separator orientation='vertical' />
          <Ui.Small className='font-normal'>Docs</Ui.Small>
          <Separator orientation='vertical' />
          <Ui.Small className='font-normal'>Source</Ui.Small>
        </View>
      </View>
    </View>
  );
}
