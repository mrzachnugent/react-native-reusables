import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

const H1 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component role='heading' aria-level='1' style={cs(styles.h1, style)} ref={ref} {...props} />
    );
  }
);

H1.displayName = 'H1';

const H2 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component role='heading' aria-level='2' style={cs(styles.h2, style)} ref={ref} {...props} />
    );
  }
);

H2.displayName = 'H2';

const H3 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component role='heading' aria-level='3' style={cs(styles.h3, style)} ref={ref} {...props} />
    );
  }
);

H3.displayName = 'H3';

const H4 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component role='heading' aria-level='4' style={cs(styles.h4, style)} ref={ref} {...props} />
    );
  }
);

H4.displayName = 'H4';

const P = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.p, style)} ref={ref} {...props} />;
  }
);
P.displayName = 'P';

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.blockQuote, style)} ref={ref} {...props} />;
  }
);

BlockQuote.displayName = 'BlockQuote';

const Code = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.code, style)} ref={ref} {...props} />;
  }
);

Code.displayName = 'Code';

const Lead = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.lead, style)} ref={ref} {...props} />;
  }
);

Lead.displayName = 'Lead';

const Large = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.large, style)} ref={ref} {...props} />;
  }
);

Large.displayName = 'Large';

const Small = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.small, style)} ref={ref} {...props} />;
  }
);

Small.displayName = 'Small';

const Muted = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.muted, style)} ref={ref} {...props} />;
  }
);

Muted.displayName = 'Muted';

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    h1: {
      fontSize: utils.mediaMinWidth('lg') ? utils.fontSize('5xl') : utils.fontSize('4xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('extrabold'),
      letterSpacing: utils.tracking('tight'),
    },
    h2: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: utils.space(2),
      fontSize: utils.fontSize('3xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
      letterSpacing: utils.tracking('tight'),
    },
    h3: {
      fontSize: utils.fontSize('2xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
      letterSpacing: utils.tracking('tight'),
    },
    h4: {
      fontSize: utils.fontSize('xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
      letterSpacing: utils.tracking('tight'),
    },
    p: {
      fontSize: utils.fontSize('base'),
      color: colors.foreground,
    },
    blockQuote: {
      marginTop: utils.space(4),
      borderLeftWidth: utils.space(0.5),
      borderLeftColor: colors.border,
      paddingLeft: utils.space(3),
      fontSize: utils.fontSize('base'),
      color: colors.foreground,
      fontStyle: 'italic',
    },
    code: {
      position: 'relative',
      borderRadius: utils.rounded('md'),
      backgroundColor: colors.muted,
      paddingHorizontal: utils.rem(1.2),
      paddingVertical: utils.rem(0.8),
      fontSize: utils.fontSize('sm'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
    },
    lead: {
      fontSize: utils.fontSize('xl'),
      color: colors.mutedForeground,
    },
    large: {
      fontSize: utils.fontSize('xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
    },
    small: {
      fontSize: utils.fontSize('sm'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('medium'),
    },
    muted: {
      fontSize: utils.fontSize('sm'),
      color: colors.mutedForeground,
    },
  };
});
