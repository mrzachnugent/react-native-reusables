import * as React from 'react';
import { GestureResponderEvent, Modal, Pressable, Text, View } from 'react-native';
import * as Slot from '@rn-primitives/slot';
import { cn } from '../../lib/utils';
import { Button } from './button';

interface DialogProps {
  children: React.ReactNode;
  closeOnOverlayPress?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface DialogContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  closeOnOverlayPress: boolean;
}

const DialogContext = React.createContext<DialogContext>({} as DialogContext);

const Dialog = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & DialogProps
>(({ open, setOpen, closeOnOverlayPress = true, defaultOpen = false, ...props }, ref) => {
  const [visible, setVisible] = React.useState(defaultOpen ?? false);
  return (
    <DialogContext.Provider
      value={{
        visible: open ?? visible,
        setVisible: setOpen ?? setVisible,
        closeOnOverlayPress,
      }}
    >
      <View ref={ref} {...props} />
    </DialogContext.Provider>
  );
});

Dialog.displayName = 'Dialog';

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog compound components cannot be rendered outside the Dialog component');
  }
  return context;
}

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    asChild?: boolean;
  }
>(({ onPress, asChild = false, ...props }, ref) => {
  const { setVisible } = useDialogContext();
  function handleOnPress(event: GestureResponderEvent) {
    setVisible(true);
    onPress?.(event);
  }

  const Trigger = asChild ? Slot.Pressable : Button;
  return <Trigger ref={ref} onPress={handleOnPress} {...props} />;
});

DialogTrigger.displayName = 'DialogTrigger';

const DialogContent = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & { overlayClass?: string }
>(({ className, children, animationType = 'fade', overlayClass, ...props }, ref) => {
  const { visible, setVisible, closeOnOverlayPress } = useDialogContext();

  return (
    <Modal
      ref={ref}
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible((prev) => !prev);
      }}
      statusBarTranslucent
      {...props}
    >
      <Pressable
        onPressOut={
          closeOnOverlayPress
            ? () => {
                setVisible(false);
              }
            : undefined
        }
        className={cn(
          'flex-1  justify-center items-center p-2',
          animationType !== 'slide' && 'bg-zinc-50/80 dark:bg-zinc-900/80',
          overlayClass
        )}
      >
        <Pressable
          className={cn(
            'bg-background rounded-2xl p-8 border border-border shadow-lg shadow-foreground/5',
            className
          )}
          role={'dialog'}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
});

DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return <View className={cn('gap-2', className)} ref={ref} {...props} />;
});

DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      className={cn('text-2xl leading-6 text-foreground font-semibold', className)}
      ref={ref}
      role='heading'
      {...props}
    />
  );
});

DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return <Text className={cn('text-lg text-muted-foreground', className)} ref={ref} {...props} />;
});

DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return <View className={cn('flex-row justify-end gap-3', className)} ref={ref} {...props} />;
});

DialogFooter.displayName = 'DialogFooter';

const DialogClose = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    asChild?: boolean;
  }
>(({ variant = 'outline', asChild, ...props }, ref) => {
  const { setVisible } = useDialogContext();
  const Trigger = asChild ? Slot.Pressable : Button;
  return (
    <Trigger
      variant={variant}
      onPress={() => {
        setVisible(false);
      }}
      ref={ref}
      {...props}
    />
  );
});

DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
