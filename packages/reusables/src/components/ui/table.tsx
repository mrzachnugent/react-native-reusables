import * as React from 'react';
import * as TablePrimitive from '@rn-primitives/table';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const Table = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Root
    ref={ref}
    className={cn('w-full caption-bottom text-sm', className)}
    {...props}
  />
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Header>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Header
    ref={ref}
    className={cn('border-border [&_tr]:border-b', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Body>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Body>
>(({ className, style, ...props }, ref) => (
  <TablePrimitive.Body
    ref={ref}
    className={cn('flex-1 border-border [&_tr:last-child]:border-0', className)}
    style={[{ minHeight: 2 }, style]}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Footer>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Footer>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Footer
    ref={ref}
    className={cn('bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Row>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Row>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Row
    ref={ref}
    className={cn(
      'flex-row border-border border-b web:transition-colors web:hover:bg-muted/50 web:data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Head>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Head>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value='text-muted-foreground'>
    <TablePrimitive.Head
      ref={ref}
      className={cn(
        'h-12 px-4 text-left justify-center font-medium [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Cell>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Cell>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Cell
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };
