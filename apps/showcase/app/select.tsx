import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';

export default function SelectScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  return (
    <View
      className='flex-1 justify-between items-center p-6'
      style={{ paddingBottom: insets.bottom + 24 }}
    >
      <Pressable
        className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <View className='flex-1 justify-center items-center'>
        <Select defaultValue={{ value: 'apple', label: 'Apple' }}>
          <SelectTrigger ref={triggerRef} className='w-[250px]'>
            <SelectValue
              className='text-foreground text-sm native:text-lg'
              placeholder='Select a fruit'
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-[250px]'>
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
      <View>
        <Text className='text-center text-muted-foreground pb-2'>With scroll view</Text>
        <Select defaultValue={{ value: 'apple', label: 'Apple' }}>
          <SelectTrigger className='w-[250px]'>
            <SelectValue
              className='text-foreground text-sm native:text-lg'
              placeholder='Select a fruit'
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-[250px]'>
            <ScrollView className='max-h-32'>
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
                <SelectItem label='Apple 2' value='apple2'>
                  Apple 2
                </SelectItem>
                <SelectItem label='Banana 2' value='banana2'>
                  Banana 2
                </SelectItem>
                <SelectItem label='Blueberry 2' value='blueberry2'>
                  Blueberry 2
                </SelectItem>
                <SelectItem label='Grapes 2' value='grapes2'>
                  Grapes 2
                </SelectItem>
                <SelectItem label='Pineapple 2' value='pineapple2'>
                  Pineapple 2
                </SelectItem>
                <SelectItem label='Apple 3' value='apple3'>
                  Apple 3
                </SelectItem>
                <SelectItem label='Banana 3' value='banana3'>
                  Banana 3
                </SelectItem>
                <SelectItem label='Blueberry 3' value='blueberry3'>
                  Blueberry 3
                </SelectItem>
                <SelectItem label='Grapes 3' value='grapes3'>
                  Grapes 3
                </SelectItem>
                <SelectItem label='Pineapple 3' value='pineapple3'>
                  Pineapple 3
                </SelectItem>
              </SelectGroup>
            </ScrollView>
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}
