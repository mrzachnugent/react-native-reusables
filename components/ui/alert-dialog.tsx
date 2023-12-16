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
import * as Haptics from 'expo-haptics';

// TODO: Add accessibility: https://reactnative.dev/docs/accessibility
// TODO: Use Button or button variants when added

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
>(({ className, closeOnOverlayPress = true, ...props }, ref) => {
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
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    textClass?: string;
    children: React.ReactNode;
  }
>(({ className, textClass, children, ...props }, ref) => {
  const { setVisible } = useAlertDialogContext();
  return (
    <Pressable
      ref={ref}
      className={cn('bg-primary rounded-lg p-4', className)}
      onPress={() => {
        setVisible(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      {...props}
    >
      <Text
        className={cn('text-lg text-primary-foreground font-bold', textClass)}
      >
        {children}
      </Text>
    </Pressable>
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
            'flex-1 bg-zinc-50/80 dark:bg-zinc-900/80 justify-center items-center p-2',
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
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  const { setVisible } = useAlertDialogContext();
  return (
    <Pressable
      className={cn('border border-border rounded-lg px-5 py-3', className)}
      onPress={() => {
        setVisible(false);
      }}
      ref={ref}
      {...props}
    >
      <Text className='text-lg text-muted-foreground font-medium'>
        {children}
      </Text>
    </Pressable>
  );
});

AlertDialogCancel.displayName = 'AlertDialogCancel';

type PressableProps = React.ComponentPropsWithoutRef<typeof Pressable>;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<PressableProps, 'onPress'> & {
    children: React.ReactNode;
    onPress?:
      | ((event: GestureResponderEvent) => void)
      | ((event: GestureResponderEvent) => Promise<void>);
  }
>(({ className, children, onPress, ...props }, ref) => {
  const { setVisible } = useAlertDialogContext();
  return (
    <Pressable
      className={cn('bg-primary rounded-lg px-5 py-3', className)}
      onPress={async (ev) => {
        await onPress?.(ev);
        setVisible(false);
      }}
      ref={ref}
      {...props}
    >
      <Text className='text-lg text-primary-foreground font-bold'>
        {children}
      </Text>
    </Pressable>
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
