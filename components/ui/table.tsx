import { Pressable, ScrollView, Text, View } from 'react-native';
import * as React from 'react';

import { cn } from '~/lib/utils';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressableSlot } from '../primitives/pressable-slot';

const Table = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
    <View ref={ref} className={className} {...props} />
  </ScrollView>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={className} {...props} />
));
TableHeader.displayName = 'TableHeader';

type TableBodyListProps<T> = React.ComponentPropsWithoutRef<
  typeof FlashList<T>
> & {
  rootClass?: string;
};

function TableBodyList<T>(
  { rootClass, ...props }: TableBodyListProps<T>,
  ref: React.ForwardedRef<React.ElementRef<typeof FlashList<T>>>
) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={cn('flex-1', rootClass)}
      style={{ minHeight: 2 }}
      {...props}
    >
      <FlashList<T>
        ref={ref}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </View>
  );
}

interface WithForwardRefTableBody
  extends React.FC<TableBodyListProps<unknown>> {
  <T>(props: TableBodyListProps<T>): ReturnType<
    React.FC<TableBodyListProps<T>>
  >;
}

const TableBody: WithForwardRefTableBody = React.forwardRef(TableBodyList);
TableBody.displayName = 'TableBody';

TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('bg-muted font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Row = asChild ? PressableSlot : Pressable;
  return (
    <Row
      ref={ref}
      className={cn('flex-row border-border border-b', className)}
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    textClass?: string;
  }
>(({ children, className, textClass, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('h-12 justify-center px-4', className)}
    {...props}
  >
    {typeof children === 'string' ? (
      <Text
        className={cn('text-left font-medium text-muted-foreground', textClass)}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    textClass?: string;
  }
>(({ children, className, textClass, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex-1 justify-center p-4', className)}
    {...props}
  >
    {typeof children === 'string' ? (
      <Text className={cn('text-foreground', textClass)}>{children}</Text>
    ) : (
      children
    )}
  </View>
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    textClass?: string;
  }
>(({ children, className, textClass, ...props }, ref) => (
  <View ref={ref} className={cn('pt-6', className)} {...props}>
    {typeof children === 'string' ? (
      <Text className={cn('text-sm text-muted-foreground', textClass)}>
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
