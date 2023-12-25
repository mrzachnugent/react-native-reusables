import Drawer from 'expo-router/drawer';
import { Alert, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';

export default function TableScreen() {
  return (
    <>
      <Drawer.Screen
        options={{ headerStyle: { shadowColor: 'transparent' } }}
      />
      <Table>
        <TableHeader className=''>
          <TableRow>
            <TableHead className='w-40'>Invoice</TableHead>
            <TableHead className='w-40'>Status</TableHead>
            <TableHead className='w-40'>Method</TableHead>
            <TableHead className='w-40' textClass='text-center'>
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          data={invoices}
          estimatedItemSize={45}
          renderItem={({ item: invoice, index }) => {
            return (
              <TableRow
                key={invoice.invoice}
                className={cn(
                  index % 2 && 'bg-zinc-100/50 dark:bg-zinc-900/50'
                )}
                onPress={() => {
                  Alert.alert(`Row for invoice ${invoice.invoice} pressed`);
                }}
              >
                {({ pressed }) => (
                  <>
                    <TableCell
                      className={cn('w-40', pressed && 'bg-secondary')}
                      textClass='font-medium text-foreground'
                    >
                      {invoice.invoice}
                    </TableCell>
                    <TableCell
                      className={cn('w-40', pressed && 'bg-secondary')}
                      textClass='text-foreground'
                    >
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell
                      className={cn('w-40', pressed && 'bg-secondary')}
                      textClass='text-foreground'
                    >
                      {invoice.paymentMethod}
                    </TableCell>
                    <TableCell
                      className={cn('w-40', pressed && 'bg-secondary')}
                      textClass='text-foreground text-right'
                    >
                      <Button
                        variant='secondary'
                        size='sm'
                        onPress={() => {
                          Toast.show({
                            type: 'base',
                            text1: 'Added to cart!',
                            text2: 'Some description of that this could do.',
                            props: {
                              icon: 'ShoppingCart',
                            },
                          });
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
                    <TableCell>
                      <Text className='text-foreground'>Total</Text>
                    </TableCell>
                    <TableCell className='items-end pr-6'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onPress={() => {
                          Toast.show({
                            type: 'base',
                            text1: 'Added to cart!',
                            text2: 'Some description of that this could do.',
                            props: {
                              icon: 'ShoppingCart',
                            },
                          });
                        }}
                      >
                        $2,500.00
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
                <TableCaption className=''>
                  <Text className='text-muted-foreground text-center '>
                    A list of your recent invoices.
                  </Text>
                </TableCaption>
              </>
            );
          }}
        />
      </Table>
    </>
  );
}

const invoices = [
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
