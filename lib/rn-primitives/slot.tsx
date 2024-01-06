import React from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  Pressable as RNPressable,
  PressableProps as RNPressableprops,
  PressableStateCallbackType,
  ImageStyle as RNImageStyle,
  StyleProp,
  View as RNView,
  ViewProps as RNViewProps,
} from 'react-native';

const Pressable = React.forwardRef<
  React.ElementRef<typeof RNPressable>,
  RNPressableprops
>((props, forwardedRef) => {
  const { children, ...pressableslotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('PressableSlot - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNPressable>,
    React.ElementRef<typeof RNPressable>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(pressableslotProps, children.props),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Pressable.displayName = 'SloPressablet';

const View = React.forwardRef<React.ElementRef<typeof RNView>, RNViewProps>(
  (props, forwardedRef) => {
    const { children, ...viewSlotProps } = props;

    if (!React.isValidElement(children)) {
      console.log('ViewSlot - Invalid asChild element', children);
      return null;
    }

    return React.cloneElement<
      React.ComponentPropsWithoutRef<typeof RNView>,
      React.ElementRef<typeof RNView>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(viewSlotProps, children.props),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

View.displayName = 'SlotView';

type ImageSlotProps = RNImageProps & {
  children?: React.ReactNode;
};

const Image = React.forwardRef<
  React.ElementRef<typeof RNImage>,
  ImageSlotProps
>((props, forwardedRef) => {
  const { children, ...imageSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('ImageSlot - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNImage>,
    React.ElementRef<typeof RNImage>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(imageSlotProps, children.props),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Image.displayName = 'SlotImage';

export { Image, Pressable, View };

// This project uses code from WorkOS/Radix Primitives.
// The code is licensed under the MIT License.
// https://github.com/radix-ui/primitives/tree/main

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = combineStyles(slotPropValue, childPropValue);
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

type PressableStyle = RNPressableprops['style'];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

function combineStyles(slotStyle?: Style, childValue?: Style) {
  if (typeof slotStyle === 'function' && typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return [slotStyle(state), childValue(state)];
    };
  }
  if (typeof slotStyle === 'function') {
    return (state: PressableStateCallbackType) => {
      return childValue ? [slotStyle(state), childValue] : slotStyle(state);
    };
  }
  if (typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return slotStyle ? [slotStyle, childValue(state)] : childValue(state);
    };
  }

  return [slotStyle, childValue].filter(Boolean);
}

export function isTextChildren(
  children:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
