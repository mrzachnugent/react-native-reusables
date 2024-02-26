import * as React from 'react';
import { View } from 'react-native';
import { Skeleton } from '~/components/ui/skeleton';

export default function SkeletonScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='flex flex-row items-center gap-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <View className='gap-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </View>
      </View>
    </View>
  );
}
