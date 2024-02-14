import { Column, ColumnDef } from '@tanstack/react-table';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ArrowDown, ArrowUp } from '~/components/Icons';
import { Button } from '~/components/ui/button';
import { DataTable } from '~/components/ui/data-table';
import { Skeleton } from '~/components/ui/skeleton';
import { TableCell, TableRow } from '~/components/ui/table';

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
    size: 170,
    header: ({ column }) => <Header title='Name' column={column} />,
    cell: ({ row }) => {
      return (
        <Text className='text-foreground font-medium'>
          {row.getValue('name')}
        </Text>
      );
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <Header title='Username' column={column} />,
    cell: ({ row }) => {
      return (
        <Text className='text-foreground'>{row.getValue('username')}</Text>
      );
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
      <Drawer.Screen
        options={{ headerStyle: { shadowColor: 'transparent' } }}
      />
      <View className='flex-1 justify-center items-center'>
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
                icon: 'Rows',
              },
              visibilityTime: 1000,
            });
          }}
          ListEmptyComponent={() => {
            return (
              <TableRow className='border-b-0 opacity-50 dark:opacity-30'>
                <Skeleton show height={height} radius={0}>
                  <TableCell
                    width={width}
                    style={{ height: height }}
                    className='flex-1'
                  />
                </Skeleton>
              </TableRow>
            );
          }}
        />
      </View>
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
      className='px-0 justify-start active:opacity-70'
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
