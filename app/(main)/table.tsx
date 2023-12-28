import Drawer from 'expo-router/drawer';
import { ChevronDown } from 'lucide-react-native';
import { Alert, Dimensions, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Table,
  TableBody,
  TableRowsList,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';

const { width } = Dimensions.get('window');

const MIN_COLUMN_WIDTHS = [120, 120, 100, 160];

function getColumnWidth(minWidths: number[]) {
  return minWidths.map((minWidth) => {
    const evenWidth = width / minWidths.length;
    return evenWidth > minWidth ? evenWidth : minWidth;
  });
}

const columnWidths = getColumnWidth(MIN_COLUMN_WIDTHS);

export default function TableScreen() {
  return (
    <>
      <Drawer.Screen
        options={{ headerStyle: { shadowColor: 'transparent' } }}
      />
      <Table nativeID='invoice-table'>
        <TableHeader>
          <TableRow>
            <TableHead className='px-0.5' width={columnWidths[0] as number}>
              <Popover>
                <PopoverTrigger
                  variant='ghost'
                  size='sm'
                  className='justify-start'
                >
                  {({ pressed }) => (
                    <>
                      <Text
                        className={cn(
                          pressed && 'opacity-70',
                          'text-base text-muted-foreground font-medium'
                        )}
                      >
                        Invoice
                      </Text>
                      <ChevronDown
                        className={cn(
                          pressed && 'opacity-70',
                          'text-muted-foreground'
                        )}
                        size={18}
                      />
                    </>
                  )}
                </PopoverTrigger>
                <PopoverContent width={300} className='p-5'>
                  <View className='gap-1.5'>
                    <Text className='text-2xl font-bold text-foreground'>
                      Table Head
                    </Text>
                    <Text className='text-lg text-muted-foreground'>
                      This is the Invoice column. Just an example of a popover.
                    </Text>
                  </View>
                </PopoverContent>
              </Popover>
            </TableHead>
            <TableHead width={columnWidths[1] as number}>Status</TableHead>
            <TableHead width={columnWidths[2] as number}>Method</TableHead>
            <TableHead
              width={columnWidths[3] as number}
              textClass='text-center'
            >
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRowsList
            data={INVOICES}
            estimatedItemSize={45}
            renderItem={({ item: invoice, index }) => {
              return (
                <TableRow
                  key={invoice.invoice}
                  className={cn(
                    index % 2 && 'bg-zinc-100/50 dark:bg-zinc-900/50'
                  )}
                  onPress={() => {
                    Toast.show({
                      type: 'base',
                      text1: `${invoice.invoice}`,
                      text2: 'The row was pressed.',
                      props: {
                        icon: 'Rows',
                      },
                      visibilityTime: 1500,
                    });
                  }}
                >
                  {({ pressed }) => (
                    <>
                      <TableCell
                        className={cn(pressed && 'bg-secondary')}
                        textClass='font-medium text-foreground'
                        width={columnWidths[0] as number}
                      >
                        {invoice.invoice}
                      </TableCell>
                      <TableCell
                        className={cn(pressed && 'bg-secondary')}
                        textClass='text-foreground'
                        width={columnWidths[1] as number}
                      >
                        {invoice.paymentStatus}
                      </TableCell>
                      <TableCell
                        className={cn(pressed && 'bg-secondary')}
                        textClass='text-foreground'
                        width={columnWidths[2] as number}
                      >
                        {invoice.paymentMethod}
                      </TableCell>
                      <TableCell
                        className={cn(pressed && 'bg-secondary ')}
                        width={columnWidths[3] as number}
                      >
                        <Button
                          variant='secondary'
                          size='sm'
                          onPress={() => {
                            Alert.alert(
                              invoice.totalAmount,
                              `You pressed the price button on invoice ${invoice.invoice}.`
                            );
                          }}
                        >
                          {invoice.totalAmount}
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            }}
            ListFooterComponent={() => {
              return (
                <>
                  <TableFooter>
                    <TableRow>
                      <TableCell className='flex-1' width={200}>
                        <Text className='text-foreground'>Total</Text>
                      </TableCell>
                      <TableCell className='items-end pr-8' width={200}>
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
                          $2,500.00
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                  <TableCaption aria-labelledbyledBy='invoice-table'>
                    <Text className='text-muted-foreground text-center '>
                      A list of your recent invoices.
                    </Text>
                  </TableCaption>
                </>
              );
            }}
          />
        </TableBody>
      </Table>
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
