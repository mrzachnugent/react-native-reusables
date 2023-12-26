import { Text } from 'react-native';

// isExpoGo = https://docs.expo.dev/bare/using-expo-client/#runtime-detection

// TODO: Use https://zeego.dev/ which requires native code (does not work with Expo Go)
// Use onPress to show a context menu
// Expo Go: use a Popover
export function DropdownMenu() {
  return <Text className='text-foreground'>Dropdown Menu</Text>;
}
