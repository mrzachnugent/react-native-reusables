import * as React from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

function Card({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View
      className={cn(
        'rounded-lg border border-border bg-card shadow-sm shadow-foreground/10',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return (
    <Text
      role='heading'
      aria-level={3}
      className={cn(
        'text-2xl text-card-foreground font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardContent({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <TextClassContext.Provider value='text-card-foreground'>
      <View className={cn('p-6 pt-0', className)} {...props} />
    </TextClassContext.Provider>
  );
}

function CardFooter({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
