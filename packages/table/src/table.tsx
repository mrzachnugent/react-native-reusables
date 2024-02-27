import * as React from 'react';
import { Pressable, View } from 'react-native';
import * as Slot from '@rnr/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr/types';

const Root = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='table' ref={ref} {...props} />;
});
Root.displayName = 'RootTable';

const Header = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='rowheader' ref={ref} {...props} />;
});
Header.displayName = 'HeaderTable';

const Row = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} role='row' {...props} />;
  }
);
Row.displayName = 'RowTable';

const Head = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='columnheader' {...props} />;
});
Head.displayName = 'HeadTable';

const Body = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Body.displayName = 'BodyTable';

const Cell = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='cell' {...props} />;
});
Cell.displayName = 'CellTable';

const Footer = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Footer.displayName = 'FooterTable';

export { Body, Cell, Footer, Head, Header, Root, Row };
