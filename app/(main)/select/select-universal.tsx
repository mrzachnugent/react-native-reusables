import * as React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Option,
} from '~/components/ui/select';

const VALUES = {
  apple: 'Apple',
  banana: 'Banana',
  blueberry: 'Blueberry',
  grapes: 'Grapes',
  pineapple: 'Pineapple',
};

export default function SelectUniversalScreen() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Option>();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  function onValueChange(val: Option) {
    // prevent unselecting on native to replicate web behavior
    if (val) {
      // On web, the label and the value are the same.
      // Ex: { label: 'apple', value: 'apple' }
      // To replicate the native behavior, we need to set the proper label
      if (Platform.OS === 'web') {
        val.label =
          val.label in VALUES
            ? VALUES[val.label as keyof typeof VALUES]
            : val.label;
      }
      setValue(val);
    }
  }

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Select
          open={open}
          onOpenChange={setOpen}
          value={value}
          onValueChange={onValueChange}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue
              className='text-foreground text-sm native:text-lg'
              placeholder='Select a fruit'
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-[180px]'>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem label='Apple' value='apple'>
                Apple
              </SelectItem>
              <SelectItem label='Banana' value='banana'>
                Banana
              </SelectItem>
              <SelectItem label='Blueberry' value='blueberry'>
                Blueberry
              </SelectItem>
              <SelectItem label='Grapes' value='grapes'>
                Grapes
              </SelectItem>
              <SelectItem label='Pineapple' value='pineapple'>
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
    </>
  );
}
