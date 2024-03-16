import * as React from 'react';
import { Keyboard, type KeyboardEvent } from 'react-native';

const EVENT_TYPE = {
  // Only keyboardDidShow and keyboardDidHide events are available on Android with 1 exception: https://reactnative.dev/docs/keyboard#addlistener
  didShow: { show: 'keyboardDidShow', hide: 'keyboardDidHide' },
  willShow: { show: 'keyboardWillShow', hide: 'keyboardWillHide' },
} as const;

export function useKeyboard(
  { eventType = 'didShow' }: { eventType?: keyof typeof EVENT_TYPE } = { eventType: 'didShow' }
) {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const showListener = Keyboard.addListener(EVENT_TYPE[eventType].show, (e: KeyboardEvent) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideListener = Keyboard.addListener(EVENT_TYPE[eventType].hide, () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  function dismissKeyboard() {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  }

  return {
    isKeyboardVisible,
    keyboardHeight,
    dismissKeyboard,
  };
}
