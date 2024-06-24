import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { Pressable, ScrollView, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Slot from '@rn-primitives/slot';
import { cn, isTextChildren } from '../../lib/utils';

const Table = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
    <View role='table' ref={ref} className={className} {...props} />
  </ScrollView>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View role='rowheader' ref={ref} className={className} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<React.ComponentPropsWithoutRef<typeof View>, 'style'> & {
    style?: ViewStyle;
  }
>(({ className, style, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex-1', className)}
    style={[{ minHeight: 2 }, style]}
    role='rowgroup'
    {...props}
  />
));
TableBody.displayName = 'TableBody';

type TableRowsFlashListProps<T> = React.ComponentPropsWithoutRef<typeof FlashList<T>> & {
  rootClass?: string;
};

function TableRowsFlashList<T>(
  { contentContainerStyle, ...props }: TableRowsFlashListProps<T>,
  ref: React.ForwardedRef<React.ElementRef<typeof FlashList<T>>>
) {
  const insets = useSafeAreaInsets();
  return (
    <FlashList<T>
      ref={ref}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        ...contentContainerStyle,
      }}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}

interface WithForwardRefTableRowsList extends React.FC<TableRowsFlashListProps<unknown>> {
  <T>(props: TableRowsFlashListProps<T>): ReturnType<React.FC<TableRowsFlashListProps<T>>>;
}

const TableRowsList: WithForwardRefTableRowsList = React.forwardRef(TableRowsFlashList);
TableRowsList.displayName = 'TableRowsList';

const TableFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('bg-muted font-medium', className)} role='rowgroup' {...props} />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Row = asChild ? Slot.Pressable : Pressable;
  return (
    <Row
      ref={ref}
      className={cn('flex-row border-border border-b', className)}
      role='row'
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<React.ComponentPropsWithoutRef<typeof View>, 'style'> & {
    width: number;
    textClass?: string;
    style?: ViewStyle;
  }
>(({ children, width, style, className, textClass, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('h-12 flex-1 justify-center px-4', className)}
    role='columnheader'
    style={[{ width }, style]}
    {...props}
  >
    {isTextChildren(children) ? (
      <Text className={cn('text-left font-medium text-muted-foreground', textClass)}>
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
  Omit<React.ComponentPropsWithoutRef<typeof View>, 'style'> & {
    width: number;
    textClass?: string;
    numberOfLines?: number;
    style?: ViewStyle;
  }
>(({ width, style, children, className, textClass, numberOfLines = 1, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('justify-center p-4', className)}
    role='cell'
    style={[{ width }, style]}
    {...props}
  >
    {isTextChildren(children) ? (
      <Text className={cn('text-foreground', textClass)} numberOfLines={numberOfLines}>
        {children}
      </Text>
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
    {isTextChildren(children) ? (
      <Text className={cn('text-sm text-muted-foreground text-center', textClass)}>{children}</Text>
    ) : (
      children
    )}
  </View>
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableRowsList,
  type TableRowsFlashListProps,
};
