import React from 'react';
import { Pressable, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/native/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='table' ref={ref} {...props} />;
});
Root.displayName = 'RootTable';

const Header = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='rowheader' ref={ref} {...props} />;
});
Header.displayName = 'HeaderTable';

const Row = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='row' {...props} />;
});
Row.displayName = 'RowTable';

const Head = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='columnheader' {...props} />;
});
Head.displayName = 'HeadTable';

const Body = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Body.displayName = 'BodyTable';

const Cell = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='cell' {...props} />;
});
Cell.displayName = 'CellTable';

const Footer = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Footer.displayName = 'FooterTable';

export { Body, Cell, Footer, Head, Header, Root, Row };
