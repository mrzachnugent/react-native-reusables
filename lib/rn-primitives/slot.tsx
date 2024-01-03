import React from 'react';
import {
  Image,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  ImageStyle as RNImageStyle,
  StyleProp,
  View,
} from 'react-native';

type PressableSlotProps = React.ComponentPropsWithoutRef<typeof Pressable>;

const PressableSlot = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PressableSlotProps
>((props, forwardedRef) => {
  const { children, ...pressableslotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('PressableSlot - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof Pressable>,
    React.ElementRef<typeof Pressable>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(pressableslotProps, children.props),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

PressableSlot.displayName = 'PressableSlot';

type ViewSlotProps = React.ComponentPropsWithoutRef<typeof View>;

const ViewSlot = React.forwardRef<React.ElementRef<typeof View>, ViewSlotProps>(
  (props, forwardedRef) => {
    const { children, ...viewSlotProps } = props;

    if (!React.isValidElement(children)) {
      console.log('ViewSlot - Invalid asChild element', children);
      return null;
    }

    return React.cloneElement<
      React.ComponentPropsWithoutRef<typeof View>,
      React.ElementRef<typeof View>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(viewSlotProps, children.props),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

ViewSlot.displayName = 'ViewSlot';

type ImageSlotProps = React.ComponentPropsWithoutRef<typeof Image> & {
  children?: React.ReactNode;
};

const ImageSlot = React.forwardRef<
  React.ElementRef<typeof Image>,
  ImageSlotProps
>((props, forwardedRef) => {
  const { children, ...imageSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('ImageSlot - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof Image>,
    React.ElementRef<typeof Image>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(imageSlotProps, children.props),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

ImageSlot.displayName = 'ImageSlot';

export { ImageSlot, PressableSlot, ViewSlot };

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

type PressableStyle = PressableProps['style'];
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
