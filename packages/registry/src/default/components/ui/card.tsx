import { Text, TextClassContext } from '@/registry/new-york/components/ui/text';
import { cn } from '@/registry/new-york/lib/utils';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

function Card({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View | null>;
}) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'border-border bg-card rounded-lg border shadow-sm shadow-black/5',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View | null>;
}) {
  return <View className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & {
  ref?: React.RefObject<Text | null>;
}) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & {
  ref?: React.RefObject<Text | null>;
}) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function CardContent({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View | null>;
}) {
  return <View className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View | null>;
}) {
  return <View className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
