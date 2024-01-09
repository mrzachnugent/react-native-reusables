import { ChevronDown } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Select from '~/lib/rn-primitives/todo/select';

export default function SelectPrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Select.Option>({
    value: 'bmw',
    label: 'BMW',
  });
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Select.Root
          value={value}
          onValueChange={(newValue) => {
            // prevent unselecting
            if (newValue) {
              setValue(newValue);
            }
          }}
          open={open}
          onOpenChange={setOpen}
        >
          <Select.Trigger className='bg-secondary w-52 justify-between px-4 py-2 rounded-xl flex-row gap-3 items-center'>
            <Select.Value
              className='text-foreground text-xl'
              placeholder='Select...'
            />
            <ChevronDown className='text-foreground' size={21} />
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay className='bg-red-500/10' />
            <Select.Content
              sideOffset={6}
              insets={contentInsets}
              className='bg-muted p-1 w-52'
            >
              <Select.Group>
                <Select.Label className='text-lg px-2 text-muted-foreground'>
                  Cars
                </Select.Label>
                <Select.Item
                  value='volvo'
                  label='Volvo'
                  className='flex-row justify-between items-center'
                >
                  <Select.ItemText className='text-xl text-foreground p-2' />
                  <Select.ItemIndicator className='w-4 h-4 bg-red-500' />
                </Select.Item>
                <Select.Item
                  value='bmw'
                  label='BMW'
                  className='flex-row justify-between items-center'
                >
                  <Select.ItemText className='text-xl text-foreground p-2' />
                  <Select.ItemIndicator className='w-4 h-4 bg-red-500' />
                </Select.Item>
                <Select.Item
                  value='honda'
                  label='Honda'
                  className='flex-row justify-between items-center'
                >
                  <Select.ItemText className='text-xl text-foreground p-2' />
                  <Select.ItemIndicator className='w-4 h-4 bg-red-500' />
                </Select.Item>
              </Select.Group>
              <Select.Group>
                <Select.Label className='text-lg px-2 text-muted-foreground'>
                  Color
                </Select.Label>
                <Select.Item
                  value='red'
                  label='Red'
                  className='flex-row justify-between items-center'
                >
                  <Select.ItemText className='text-xl text-foreground p-2' />
                  <Select.ItemIndicator className='w-4 h-4 bg-red-500' />
                </Select.Item>
                <Select.Item
                  value='blue'
                  label='Blue'
                  className='flex-row justify-between items-center'
                >
                  <Select.ItemText className='text-xl text-foreground p-2' />
                  <Select.ItemIndicator className='w-4 h-4 bg-red-500' />
                </Select.Item>
                <Select.Item
                  value='green'
                  label='Green'
                  className='flex-row justify-between items-center'
                >
                  <Select.ItemText className='text-xl text-foreground p-2' />
                  <Select.ItemIndicator className='w-4 h-4 bg-red-500' />
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </View>
    </>
  );
}
