import { Column, ColumnDef } from '@tanstack/react-table';
import { Stack } from 'expo-router';
import * as React from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ArrowDown, ArrowUp, Info } from '~/components/Icons';
import { Button } from '~/components/ui/button';
import { DataTable } from '~/components/ui/data-table';
import { Skeleton } from '~/components/ui/skeleton';
import { TableCell, TableRow } from '~/components/ui/table';
import { Text } from '~/components/ui/text';

const { width, height } = Dimensions.get('screen');

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    size: 200,
    header: ({ column }) => <Header title='Name' column={column} />,
    cell: ({ row }) => {
      return <Text className='text-foreground font-medium'>{row.getValue('name')}</Text>;
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <Header title='Username' column={column} />,
    cell: ({ row }) => {
      return <Text className='text-foreground'>{row.getValue('username')}</Text>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <Header title='Email' column={column} />,
    cell: ({ row }) => {
      return (
        <Text numberOfLines={1} className='text-foreground'>
          {row.getValue('email')}
        </Text>
      );
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <Header title='Address' column={column} />,
    cell: ({ row }) => {
      return (
        <Text className='text-foreground'>{`${row.original.address.street} - ${row.original.address.city}`}</Text>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <Header title='Phone' column={column} />,
    size: 200,
    cell: ({ row }) => {
      return <Text className='text-foreground'>{row.getValue('phone')}</Text>;
    },
  },
];

export default function DataTableScreen() {
  const insets = useSafeAreaInsets();
  const [fetchedData, setFetchedData] = React.useState<User[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json: User[]) => {
          const doubledData = json.concat(
            json.map((item: User) => ({
              ...item,
              id: item.id * 2,
              name: item.name + ' 2',
            }))
          );
          setFetchedData(doubledData);
        });
    }, 1500);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <DataTable
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        data={fetchedData}
        columns={columns}
        onRowPress={(row) => {
          Toast.show({
            type: 'base',
            text1: `${row.getValue('name')}`,
            text2: 'The row was pressed.',
            props: {
              icon: Info,
            },
            visibilityTime: 1000,
            topOffset: insets.top === 0 ? 12 : insets.top,
          });
        }}
        ListEmptyComponent={() => {
          return (
            <TableRow className='border-b-0 dark:opacity-50'>
              <Skeleton className='flex-1'>
                <TableCell style={{ height, width }} className='flex-1 ' />
              </Skeleton>
            </TableRow>
          );
        }}
      />
    </>
  );
}

function Header({ title, column }: { title: string; column: Column<User> }) {
  return (
    <Button
      onPress={() => {
        if (column.getIsSorted() === 'desc') {
          column.clearSorting();
          return;
        }
        column.toggleSorting(column.getIsSorted() === 'asc');
      }}
      size='sm'
      variant='ghost'
      className='flex flex-row px-0 justify-start gap-1.5 web:hover:bg-background/0 web:hover:opacity-80 active:bg-background/0'
    >
      <Text className={'font-medium text-muted-foreground'}>{title}</Text>
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp size={15} className='ml-2 text-muted-foreground' />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDown size={15} className='ml-2 text-muted-foreground' />
      ) : null}
    </Button>
  );
}
