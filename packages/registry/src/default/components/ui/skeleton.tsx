'use client';

import { cn } from '@/registry/default/lib/utils';
import * as React from 'react';
import { View } from 'react-native';

function Skeleton({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('bg-accent animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
