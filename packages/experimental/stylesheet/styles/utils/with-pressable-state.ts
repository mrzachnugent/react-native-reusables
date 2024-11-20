import type { PressableStateCallbackType, ViewStyle } from 'react-native';

export function withPressableState<T>(
  callback: T extends undefined
    ? (state: PressableStateCallbackType, arg?: T) => ViewStyle
    : (state: PressableStateCallbackType, arg: T) => ViewStyle,
  arg?: T
) {
  return (state: PressableStateCallbackType) => {
    return callback(state, arg as T);
  };
}
