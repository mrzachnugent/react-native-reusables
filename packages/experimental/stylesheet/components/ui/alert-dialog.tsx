import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyleSheet } from '~/styles/stylesheet';
import { getBaseUnitScale } from '~/styles/utils/base-unit';
import { cfs, cs } from '~/styles/utils/combine';
import { FONT_WEIGHT } from '~/styles/utils/font-weight';
import { SHADOW } from '~/styles/utils/shadow';
import { withOpacity } from '~/styles/utils/with-opacity';
import { buttonStyleSheet } from './button';
import { TextStyleContext } from './text';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  AlertDialogPrimitive.OverlayRef,
  AlertDialogPrimitive.OverlayProps
>(({ style, children, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <AlertDialogPrimitive.Overlay style={cs(styles.overlay, style)} {...props} ref={ref} asChild>
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
        {children}
      </Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
});

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

const AlertDialogContent = React.forwardRef<
  AlertDialogPrimitive.ContentRef,
  AlertDialogPrimitive.ContentProps & { portalHost?: string }
>(({ style, portalHost, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content ref={ref} style={cs(styles.content, style)} {...props} />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ style, ...props }: ViewProps) => {
  const { styles } = useStyleSheet(stylesheet);
  return <View style={cs(styles.header, style)} {...props} />;
};
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ style, ...props }: ViewProps) => {
  const { styles } = useStyleSheet(stylesheet);
  return <View style={cs(styles.footer, style)} {...props} />;
};
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  AlertDialogPrimitive.TitleRef,
  AlertDialogPrimitive.TitleProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <AlertDialogPrimitive.Title ref={ref} style={cs(styles.title, style)} {...props} />;
});
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  AlertDialogPrimitive.DescriptionRef,
  AlertDialogPrimitive.DescriptionProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <AlertDialogPrimitive.Description ref={ref} style={cs(styles.description, style)} {...props} />
  );
});
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  AlertDialogPrimitive.ActionRef,
  AlertDialogPrimitive.ActionProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(buttonStyleSheet);
  return (
    <TextStyleContext.Provider value={styles.text()}>
      <AlertDialogPrimitive.Action ref={ref} style={cfs(styles.button(), style)} {...props} />
    </TextStyleContext.Provider>
  );
});
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  AlertDialogPrimitive.CancelRef,
  AlertDialogPrimitive.CancelProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(buttonStyleSheet);

  return (
    <TextStyleContext.Provider value={styles.text({ variant: 'outline' })}>
      <AlertDialogPrimitive.Cancel
        ref={ref}
        style={cfs(styles.button({ variant: 'outline' }), style)}
        {...props}
      />
    </TextStyleContext.Provider>
  );
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

const stylesheet = createStyleSheet(({ colors }, { space, rounded, mediaMinWidth, fontSize }) => {
  return {
    overlay: {
      backgroundColor: withOpacity('black', 0.8),
      justifyContent: 'center',
      alignItems: 'center',
      padding: space[2],
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    content: {
      maxWidth: getBaseUnitScale(32),
      gap: space[4],
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      padding: space[6],
      ...SHADOW['lg'],
      shadowColor: withOpacity(colors.foreground, 0.1),
      borderRadius: rounded['lg'],
    },
    header: {
      gap: space[2],
    },
    footer: {
      flexDirection: mediaMinWidth['md'] ? 'row-reverse' : 'column',
      gap: space[2],
    },
    title: {
      fontSize: fontSize['xl'],
      color: colors.foreground,
      fontWeight: FONT_WEIGHT['semiBold'],
    },
    description: {
      fontSize: fontSize['base'],
      color: colors.mutedForeground,
    },
  };
});
