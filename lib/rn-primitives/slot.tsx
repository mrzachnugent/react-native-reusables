import * as React from 'react';
import { Pressable, View, Image } from 'react-native';
import { isTextChildren } from '~/lib/utils';

type PressableSlotProps = React.ComponentPropsWithoutRef<typeof Pressable>;

const PressableSlot = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PressableSlotProps
>((props, forwardedRef) => {
  const { children, ...pressableslotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof Pressable>,
    React.ElementRef<typeof Pressable>
  >(isTextChildren(children) ? <Pressable /> : children, {
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
      console.log('Invalid asChild element', children);
      return null;
    }

    return React.cloneElement<
      React.ComponentPropsWithoutRef<typeof View>,
      React.ElementRef<typeof View>
    >(isTextChildren(children) ? <View /> : children, {
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
    console.log('Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof Image>,
    React.ElementRef<typeof Image>
  >(isTextChildren(children) ? <View /> : children, {
    ...mergeProps(imageSlotProps, children.props),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

ImageSlot.displayName = 'ImageSlot';

export { PressableSlot, ViewSlot, ImageSlot };

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
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}
