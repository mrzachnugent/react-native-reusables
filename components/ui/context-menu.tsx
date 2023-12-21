import { Text } from 'react-native';

// TODO: Use https://zeego.dev/ which requires native code (does not work with Expo)
// Use onLongPress to show a context menu
// Expo Go: use a Popover with onLongPress for trigger
export function ContextMenu() {
  return <Text className='text-foreground'>Context Menu</Text>;
}
