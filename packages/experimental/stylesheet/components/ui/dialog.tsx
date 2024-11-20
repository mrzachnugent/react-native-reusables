import * as DialogPrimitive from '@rn-primitives/dialog';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { PressableStateCallbackType, View, type ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cfs, cs } from '~/styles/utils/combine';
import { withOpacity } from '~/styles/utils/with-opacity';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<DialogPrimitive.OverlayRef, DialogPrimitive.OverlayProps>(
  ({ style, children, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    return (
      <DialogPrimitive.Overlay style={cfs(styles.overlay, style)} {...props} ref={ref}>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
          <>{children}</>
        </Animated.View>
      </DialogPrimitive.Overlay>
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & { portalHost?: string }
>(({ style, children, portalHost, ...props }, ref) => {
  const { styles, theme } = useStyles(stylesheet);
  const { open } = DialogPrimitive.useRootContext();
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content ref={ref} style={cs(styles.content, style)} {...props}>
          {children}
          <DialogPrimitive.Close style={styles.close}>
            <X size={18} color={theme.colors.mutedForeground} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ style, ...props }: ViewProps) => {
  const { styles } = useStyles(stylesheet);
  return <View style={cs(styles.header, style)} {...props} />;
};
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ style, ...props }: ViewProps) => {
  const { styles } = useStyles(stylesheet);
  return <View style={cs(styles.footer, style)} {...props} />;
};
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<DialogPrimitive.TitleRef, DialogPrimitive.TitleProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    return <DialogPrimitive.Title ref={ref} style={cs(styles.title, style)} {...props} />;
  }
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  DialogPrimitive.DescriptionRef,
  DialogPrimitive.DescriptionProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return <DialogPrimitive.Description ref={ref} style={cs(styles.description, style)} {...props} />;
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: withOpacity('black', 0.8),
      justifyContent: 'center',
      alignItems: 'center',
      padding: utils.space(2),
    },
    content: {
      maxWidth: utils.rem(32),
      gap: utils.space(4),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      padding: utils.space(6),
      ...utils.shadow('lg'),
      borderRadius: utils.rounded('lg'),
    },
    close: (state: PressableStateCallbackType) => {
      return {
        position: 'absolute',
        top: utils.space(4),
        right: utils.space(4),
        padding: utils.space(0.5),
        opacity: state.pressed ? 0.5 : 1,
        borderRadius: utils.rounded('sm'),
      };
    },
    header: {
      gap: utils.space(1.5),
      textAlign: utils.mediaMinWidth('sm') ? 'left' : 'center',
    },
    footer: {
      flexDirection: utils.mediaMinWidth('sm') ? 'row' : 'column-reverse',
      justifyContent: utils.mediaMinWidth('sm') ? 'flex-end' : 'center',
      gap: utils.space(2),
    },
    title: {
      fontSize: utils.fontSize('xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
      letterSpacing: utils.tracking('tight'),
    },
    description: {
      fontSize: utils.fontSize('base'),
      color: colors.mutedForeground,
    },
  };
});
