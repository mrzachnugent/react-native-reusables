import type { Pressable, Text, View } from 'react-native';

type ComponentPropsWithAsChild<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

type ViewRef = React.ElementRef<typeof View>;
type PressableRef = React.ElementRef<typeof Pressable>;
type TextRef = React.ElementRef<typeof Text>;

type SlottableViewProps = ComponentPropsWithAsChild<typeof View>;
type SlottablePressableProps = ComponentPropsWithAsChild<typeof Pressable> & {
  /**
   * Platform: WEB ONLY
   */
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  /**
   * Platform: WEB ONLY
   */
  onKeyUp?: (ev: React.KeyboardEvent) => void;
};
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
