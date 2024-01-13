import * as Popover from '@radix-ui/react-popover';
import type { Pressable, Text, View, ViewStyle } from 'react-native';

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

interface Insets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

type RadixContent = React.ComponentProps<typeof Popover.Content>;

// TODO: the NATIVE ONLY props depend on the component
interface PositionedContentProps {
  forceMount?: true | undefined;
  style?: ViewStyle;
  alignOffset?: number;
  insets?: Insets;
  avoidCollisions?: boolean;
  /**
   * Platform: NATIVE ONLY
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Platform: NATIVE ONLY
   */
  side?: 'top' | 'bottom';
  /**
   * Platform: NATIVE ONLY
   */
  sideOffset?: number;
  /**
   * Platform: NATIVE ONLY
   */
  disablePositioningStyle?: boolean;
  /**
   * Platform: WEB ONLY
   */
  loop?: boolean;
  /**
   * Platform: WEB ONLY
   */
  onCloseAutoFocus?: RadixContent['onCloseAutoFocus'];
  /**
   * Platform: WEB ONLY
   */
  onEscapeKeyDown?: RadixContent['onEscapeKeyDown'];
  /**
   * Platform: WEB ONLY
   */
  onPointerDownOutside?: RadixContent['onPointerDownOutside'];
  /**
   * Platform: WEB ONLY
   */
  onFocusOutside?: RadixContent['onFocusOutside'];
  /**
   * Platform: WEB ONLY
   */
  onInteractOutside?: RadixContent['onInteractOutside'];
  /**
   * Platform: WEB ONLY
   */
  collisionBoundary?: RadixContent['collisionBoundary'];
  /**
   * Platform: WEB ONLY
   */
  sticky?: RadixContent['sticky'];
  /**
   * Platform: WEB ONLY
   */
  hideWhenDetached?: RadixContent['hideWhenDetached'];
}

interface ForceMountable {
  forceMount?: true | undefined;
}

export type {
  ComponentPropsWithAsChild,
  ForceMountable,
  Insets,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
};
