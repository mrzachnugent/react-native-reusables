import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import * as React from 'react';
import { Alert, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ChevronDown, Info } from '~/components/Icons';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function TableScreen() {
  const { width } = useWindowDimensions();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby='invoice-table'>
          <TableHeader>
            <TableRow>
              <TableHead className='px-0.5' style={{ width: columnWidths[0] }}>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant='ghost' size='sm' className='flex-row justify-start gap-3'>
                      <Text className={cn('text-base text-muted-foreground font-medium')}>
                        Invoice
                      </Text>
                      <ChevronDown className={cn('text-muted-foreground')} size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='p-5' insets={{ left: 6 }}>
                    <View className='gap-1.5'>
                      <Text className='text-2xl font-bold text-foreground'>Table Head</Text>
                      <Text className='text-lg text-muted-foreground'>
                        This is the Invoice column. Just an example of a popover.
                      </Text>
                    </View>
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead style={{ width: columnWidths[1] }}>
                <Text>Status</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[2] }}>
                <Text>Method</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[3] }}>
                <Text className='text-center md:text-right md:pr-5'>Amount</Text>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FlashList
              data={INVOICES}
              estimatedItemSize={45}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: invoice, index }) => {
                return (
                  <TableRow
                    key={invoice.invoice}
                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                    onPress={() => {
                      Toast.show({
                        type: 'base',
                        text1: `${invoice.invoice}`,
                        text2: 'The row was pressed.',
                        props: {
                          icon: Info,
                        },
                        visibilityTime: 1500,
                        topOffset: insets.top === 0 ? 12 : insets.top,
                      });
                    }}
                  >
                    <TableCell style={{ width: columnWidths[0] }}>
                      <Text>{invoice.invoice}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[1] }}>
                      <Text>{invoice.paymentStatus}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[2] }}>
                      <Text>{invoice.paymentMethod}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[3] }} className='items-end '>
                      <Button
                        variant='secondary'
                        size='sm'
                        className='shadow-sm shadow-foreground/10 mr-3'
                        onPress={() => {
                          Alert.alert(
                            invoice.totalAmount,
                            `You pressed the price button on invoice ${invoice.invoice}.`
                          );
                        }}
                      >
                        <Text>{invoice.totalAmount}</Text>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <>
                    <TableFooter>
                      <TableRow>
                        <TableCell className='flex-1 justify-center'>
                          <Text className='text-foreground'>Total</Text>
                        </TableCell>
                        <TableCell className='items-end pr-8'>
                          <Button
                            size='sm'
                            variant='ghost'
                            onPress={() => {
                              Alert.alert(
                                'Total Amount',
                                `You pressed the total amount price button.`
                              );
                            }}
                          >
                            <Text>$2,500.00</Text>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                    <View className='items-center py-3 ios:pb-0'>
                      <Text
                        nativeID='invoice-table'
                        className='items-center text-sm text-muted-foreground'
                      >
                        A list of your recent invoices.
                      </Text>
                    </View>
                  </>
                );
              }}
            />
          </TableBody>
        </Table>
      </ScrollView>
    </>
  );
}

const INVOICES = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV008',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV009',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV0010',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0011',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV0012',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV0013',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0014',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV0015',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV0016',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV0017',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0018',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV0019',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV0020',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0021',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];
