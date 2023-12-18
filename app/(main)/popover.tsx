import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { buttonTextVariants } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';

const { height } = Dimensions.get('window');

export default function PopoverScreen() {
  return (
    <ScrollView className='flex-1'>
      <View style={{ height: height / 3 }} className='pt-32 p-6'>
        <Popover>
          <PopoverTrigger className='w-full'>
            {({ pressed }) => (
              <Text
                className={cn(
                  pressed ? 'opacity-70' : '',
                  buttonTextVariants({})
                )}
              >
                Open (full width)
              </Text>
            )}
          </PopoverTrigger>
          <PopoverContent
            className='gap-6 '
            overlayClass='bg-zinc-50/30 dark:bg-zinc-900/30'
          >
            <View>
              <Text className='text-2xl font-bold text-foreground'>
                Dimensions
              </Text>
              <Text className='text-lg text-muted-foreground'>
                Set the dimensions for the layer.
              </Text>
            </View>
            <View className='flex-row gap-5 items-center'>
              <Label className='pt-3 font-semibold w-20'>Width:</Label>
              <Input className='flex-1' defaultValue='100%' />
            </View>
            <View className='flex-row gap-5 items-center'>
              <Label className='pt-3 font-semibold w-20'>Height:</Label>
              <Input className='flex-1' defaultValue='25px' />
            </View>
          </PopoverContent>
        </Popover>
      </View>
      <View style={{ height: height }} className='pt-32 p-6'>
        <Popover>
          <PopoverTrigger className='w-full' variant={'secondary'}>
            {({ pressed }) => (
              <Text
                className={cn(
                  pressed ? 'opacity-70' : '',
                  buttonTextVariants({ variant: 'secondary' })
                )}
              >
                Open (to the right)
              </Text>
            )}
          </PopoverTrigger>
          <PopoverContent className='gap-6' width={300} align='right'>
            <View>
              <Text className='text-2xl font-bold text-foreground'>
                Dimensions
              </Text>
              <Text className='text-lg text-muted-foreground'>
                Set the dimensions for the layer.
              </Text>
            </View>
            <View className='flex-row gap-5 items-center'>
              <Label className='pt-3 font-semibold w-20'>Width:</Label>
              <Input className='flex-1' defaultValue='100%' />
            </View>
            <View className='flex-row gap-5 items-center'>
              <Label className='pt-3 font-semibold w-20'>Height:</Label>
              <Input className='flex-1' defaultValue='25px' />
            </View>
          </PopoverContent>
        </Popover>
      </View>
    </ScrollView>
  );
}
