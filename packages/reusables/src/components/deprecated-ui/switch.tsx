import * as React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { NAV_THEME } from '../../lib/constants';

const SKY_500 = '#0ea5e9';

const Switch = React.forwardRef<
  React.ElementRef<typeof RNSwitch>,
  React.ComponentPropsWithoutRef<typeof RNSwitch>
>(
  (
    {
      className,
      trackColor = { false: NAV_THEME.dark.border, true: SKY_500 },
      thumbColor = NAV_THEME.light.background,
      ios_backgroundColor = NAV_THEME.dark.border,
      ...props
    },
    ref
  ) => {
    return (
      <RNSwitch
        trackColor={trackColor}
        thumbColor={thumbColor}
        ios_backgroundColor={ios_backgroundColor}
        ref={ref}
        {...props}
      />
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
