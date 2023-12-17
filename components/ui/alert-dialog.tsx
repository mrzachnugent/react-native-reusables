import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { cn } from '~/lib/utils';
import { Button } from './button';

interface AlertDialogProps {
  children: React.ReactNode;
  closeOnOverlayPress?: boolean;
}
interface AlertDialogContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  closeOnOverlayPress: boolean;
  nativeID: string;
}

const AlertDialogContext = React.createContext<AlertDialogContext>(
  {} as AlertDialogContext
);

const AlertDialog = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & AlertDialogProps
>(({ closeOnOverlayPress = true, ...props }, ref) => {
  const nativeID = React.useId();
  const [visible, setVisible] = React.useState(false);
  return (
    <AlertDialogContext.Provider
      key={`alert-dialog-provider-${nativeID}`}
      value={{ visible, setVisible, closeOnOverlayPress, nativeID }}
    >
      <View ref={ref} {...props} />
    </AlertDialogContext.Provider>
  );
});

AlertDialog.displayName = 'AlertDialog';

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'AlertDialog compound components cannot be rendered outside the AlertDialog component'
    );
  }
  return context;
}

const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    textClass?: string;
    children: React.ReactNode;
  }
>(({ textClass, children, ...props }, ref) => {
  const { setVisible } = useAlertDialogContext();
  function onPress() {
    setVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  return (
    <Button ref={ref} onPress={onPress} {...props}>
      <Text
        className={cn('text-lg text-primary-foreground font-bold', textClass)}
      >
        {children}
      </Text>
    </Button>
  );
});

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & { overlayClass?: string }
>(
  (
    { className, children, animationType = 'fade', overlayClass, ...props },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const { visible, setVisible, closeOnOverlayPress } =
      useAlertDialogContext();
    return (
      <Modal
        ref={ref}
        animationType={animationType}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible((prev) => !prev);
        }}
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
            style={
              colorScheme === 'dark' ? styles.shadowDark : styles.shadowLight
            }
            className={cn(
              'bg-background rounded-2xl p-8 border border-border',
              className
            )}
            role={'alert'}
          >
            {children}
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return <View className={cn('gap-2', className)} ref={ref} {...props} />;
});

AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      className={cn('text-xl text-foreground font-semibold', className)}
      ref={ref}
      role='heading'
      {...props}
    />
  );
});

AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  return (
    <Text
      className={cn('text-lg text-muted-foreground', className)}
      ref={ref}
      {...props}
    />
  );
});

AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      className={cn('flex-row justify-end gap-5 pt-8', className)}
      ref={ref}
      {...props}
    />
  );
});

AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    children: React.ReactNode;
    textClass?: string;
  }
>(({ variant = 'outline', textClass, children, ...props }, ref) => {
  const { setVisible } = useAlertDialogContext();
  return (
    <Button
      variant={variant}
      onPress={() => {
        setVisible(false);
      }}
      ref={ref}
      {...props}
    >
      <Text
        className={cn('text-lg text-muted-foreground font-medium', textClass)}
      >
        {children}
      </Text>
    </Button>
  );
});

AlertDialogCancel.displayName = 'AlertDialogCancel';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<ButtonProps, 'onPress'> & {
    children: React.ReactNode;
    onPress?:
      | ((event: GestureResponderEvent) => void)
      | ((event: GestureResponderEvent) => Promise<void>);
  }
>(({ className, children, onPress, ...props }, ref) => {
  const { setVisible } = useAlertDialogContext();
  async function onPressAction(ev: GestureResponderEvent) {
    await onPress?.(ev);
    setVisible(false);
  }

  return (
    <Button onPress={onPressAction} ref={ref} {...props}>
      <Text className='text-lg text-primary-foreground font-bold'>
        {children}
      </Text>
    </Button>
  );
});

AlertDialogAction.displayName = 'AlertDialogAction';

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};

const styles = StyleSheet.create({
  shadowLight: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  shadowDark: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});
