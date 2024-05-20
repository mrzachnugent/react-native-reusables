import * as React from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { Alert, AlertDescription, AlertTitle } from '../../components/deprecated-ui/alert';
import { AlertTriangle } from '../../lib/icons/AlertTriangle';
import { CheckSquare } from '../../lib/icons/CheckSquare';
import { Info } from '../../lib/icons/Info';

/**
 * Temporary fix for warning when accessing useLayoutEffect on the server. See issue
 * https://github.com/calintamas/react-native-toast-message/issues/530
 */
if (typeof document === 'undefined') {
  // @ts-ignore
  React.useLayoutEffect = React.useEffect;
}

/**
 * @docs https://github.com/calintamas/react-native-toast-message/blob/main/docs/quick-start.md
 */
const TOAST_CONFIG: ToastConfig = {
  success: ({ text1, text2, onPress, props: { icon = CheckSquare } }) => (
    <Pressable onPress={onPress} className='w-full max-w-xl px-6'>
      <Alert icon={icon} variant='success'>
        <AlertTitle>{text1}</AlertTitle>
        <AlertDescription>{text2}</AlertDescription>
      </Alert>
    </Pressable>
  ),
  error: ({ text1, text2, onPress, props: { icon = AlertTriangle } }) => (
    <Pressable onPress={onPress} className='w-full max-w-xl px-6'>
      <Alert icon={icon} variant='destructive'>
        <AlertTitle>{text1}</AlertTitle>
        <AlertDescription>{text2}</AlertDescription>
      </Alert>
    </Pressable>
  ),
  base: ({ text1, text2, onPress, props: { icon = Info } }) => (
    <Pressable onPress={onPress} className='w-full max-w-xl px-6'>
      <Alert icon={icon} variant='default'>
        <AlertTitle>{text1}</AlertTitle>
        <AlertDescription>{text2}</AlertDescription>
      </Alert>
    </Pressable>
  ),
};

/**
 *
 * If you want to use a Toast in a Modal, you will need to add another `ToastPrivider` as a child of the Modal.
 */
function ToastProvider() {
  const insets = useSafeAreaInsets();
  return <Toast config={TOAST_CONFIG} topOffset={insets.top} bottomOffset={insets.bottom} />;
}

export { ToastProvider };
