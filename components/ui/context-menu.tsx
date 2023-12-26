import { Text } from 'react-native';

// isExpoGo = https://docs.expo.dev/bare/using-expo-client/#runtime-detection

// TODO: Use https://zeego.dev/ which requires native code (does not work with Expo Go)
// Use onLongPress to show a context menu
// Expo Go: use a Popover with onLongPress for trigger
export function ContextMenu() {
  return <Text className='text-foreground'>Context Menu</Text>;
}
