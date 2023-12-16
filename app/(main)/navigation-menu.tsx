import { View } from 'react-native';
import { NavigationMenu } from '~/components/ui/navigation-menu';

export default function NavigationMenuScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <NavigationMenu />
    </View>
  );
}
