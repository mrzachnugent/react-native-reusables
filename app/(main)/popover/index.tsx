import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
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
      <View className='w-full p-6'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
      <View style={{ height: height / 3 }} className='p-6 pt-4'>
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
          <PopoverContent className='gap-6' position='bottom'>
            <View>
              <Text className='text-2xl font-bold text-foreground'>
                Dimensions
              </Text>
              <Text className='text-lg text-muted-foreground'>
                Set the dimensions for the layer.
              </Text>
            </View>
            <View className='flex-row items-center gap-5'>
              <Label className='w-20 pt-3 font-semibold'>Width:</Label>
              <Input className='flex-1 min-w-0' defaultValue='100%' />
            </View>
            <View className='flex-row items-center gap-5'>
              <Label className='w-20 pt-3 font-semibold'>Height:</Label>
              <Input className='flex-1 min-w-0' defaultValue='25px' />
            </View>
          </PopoverContent>
        </Popover>
      </View>
      <View style={{ height: height }} className='gap-24 p-6'>
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
            <View className='flex-row items-center gap-5'>
              <Label className='w-20 pt-3 font-semibold'>Width:</Label>
              <Input className='flex-1 min-w-0' defaultValue='100%' />
            </View>
            <View className='flex-row items-center gap-5'>
              <Label className='w-20 pt-3 font-semibold'>Height:</Label>
              <Input className='flex-1 min-w-0' defaultValue='25px' />
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
            <View className='flex-row items-center gap-5'>
              <Label className='w-20 pt-3 font-semibold'>Width:</Label>
              <Input className='flex-1 min-w-0' defaultValue='100%' />
            </View>
            <View className='flex-row items-center gap-5'>
              <Label className='w-20 pt-3 font-semibold'>Height:</Label>
              <Input className='flex-1 min-w-0' defaultValue='25px' />
            </View>
          </PopoverContent>
        </Popover>
      </View>
    </ScrollView>
  );
}
