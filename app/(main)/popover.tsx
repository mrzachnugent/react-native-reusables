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
    <ScrollView>
      <View style={{ height: height / 3 }} className='pt-4 p-6'>
        <Popover>
          <PopoverTrigger className='w-full'>
            {({ pressed }) => (
              <Text
                className={cn(
                  pressed ? 'opacity-70' : '',
                  buttonTextVariants({})
                )}
              >
                Bottom-Y (trigger width)
              </Text>
            )}
          </PopoverTrigger>
          <PopoverContent className='gap-6 ' position='bottom'>
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
      <View style={{ height: height }} className='p-6 gap-24'>
        <Popover>
          <PopoverTrigger className='w-full' variant={'secondary'}>
            {({ pressed }) => (
              <Text
                className={cn(
                  pressed ? 'opacity-70' : '',
                  buttonTextVariants({ variant: 'secondary' })
                )}
              >
                Auto-Y (right 300)
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
        <Popover>
          <PopoverTrigger className='w-full' variant={'secondary'}>
            {({ pressed }) => (
              <Text
                className={cn(
                  pressed ? 'opacity-70' : '',
                  buttonTextVariants({ variant: 'secondary' })
                )}
              >
                Auto-Y (center 300)
              </Text>
            )}
          </PopoverTrigger>
          <PopoverContent className='gap-6' width={300} align='center'>
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
