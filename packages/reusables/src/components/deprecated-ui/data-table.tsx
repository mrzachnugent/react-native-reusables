import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { cn } from '../../lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowsFlashListProps,
  TableRowsList,
} from './table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowPress?: (row: Row<TData>) => void;
  estimatedItemSize?: number;
  ListEmptyComponent?: TableRowsFlashListProps<TData>['ListEmptyComponent'];
  ListFooterComponent?: TableRowsFlashListProps<TData>['ListFooterComponent'];
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

/**
 * @docs https://tanstack.com/table
 */

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowPress,
  estimatedItemSize = 45,
  ListEmptyComponent,
  ListFooterComponent,
  isRefreshing = false,
  onRefresh,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      {isRefreshing && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          className='h-14 top-16 absolute items-center justify-center w-screen'
        >
          <ActivityIndicator size='small' className='text-foreground' />
        </Animated.View>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    width={getColumnWidth(header.getSize(), columns.length)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRowsList
            data={table.getRowModel().rows}
            estimatedItemSize={estimatedItemSize}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={ListFooterComponent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                style={{ opacity: 0 }}
              />
            }
            renderItem={({ item: row, index }) => {
              return (
                <TableRow
                  className={cn(
                    'active:opacity-70',
                    index % 2 && 'bg-zinc-100/50 dark:bg-zinc-900/50'
                  )}
                  onPress={
                    onRowPress
                      ? () => {
                          onRowPress(row);
                        }
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      width={getColumnWidth(cell.column.getSize(), columns.length)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            }}
          />
        </TableBody>
      </Table>
    </>
  );
}

const { width } = Dimensions.get('window');

function getColumnWidth(size: number, length: number) {
  const evenWidth = width / length;
  return evenWidth > size ? evenWidth : size;
}
