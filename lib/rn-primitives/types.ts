import type { Pressable, Text, View } from 'react-native';

type ComponentPropsWithAsChild<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

type ViewRef = React.ElementRef<typeof View>;
type PressableRef = React.ElementRef<typeof Pressable>;
type TextRef = React.ElementRef<typeof Text>;

type SlottableViewProps = ComponentPropsWithAsChild<typeof View>;
type SlottablePressableProps = Omit<
  ComponentPropsWithAsChild<typeof Pressable>,
  'children'
> & { children: React.ReactNode };
type SlottableTextProps = ComponentPropsWithAsChild<typeof Text>;

export type {
  ComponentPropsWithAsChild,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
};
