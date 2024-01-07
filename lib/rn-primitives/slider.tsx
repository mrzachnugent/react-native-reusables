import React from 'react';
import { View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  value: number;
  disabled?: boolean;
  min?: number;
  max?: number;
}

const RootContext = React.createContext<RootProps | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, value, disabled, min, max, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <RootContext.Provider value={{ value, disabled, min, max }}>
      <Component ref={ref} role='group' {...props} />
    </RootContext.Provider>
  );
});

Root.displayName = 'RootSlider';

function useSliderContext() {
  const context = React.useContext(RootContext);
  if (context === null) {
    throw new Error(
      'Slider compound components cannot be rendered outside the Slider component'
    );
  }
  return context;
}

const Track = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const { value, min, max, disabled } = useSliderContext();

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      role='slider'
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      accessibilityValue={{ max, min, now: value }}
      {...props}
    />
  );
});

Track.displayName = 'TrackSlider';

const Range = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
});

Range.displayName = 'RangeSlider';

const Thumb = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component accessibilityRole='adjustable' ref={ref} {...props} />;
});

Thumb.displayName = 'ThumbSlider';

export { Range, Root, Thumb, Track };
