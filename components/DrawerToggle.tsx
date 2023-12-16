import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { AlignJustify } from 'lucide-react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function DrawerToggle() {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  return (
    <TouchableOpacity onPress={navigation.toggleDrawer}>
      <View className='flex-1 aspect-square justify-center items-end'>
        <AlignJustify
          className='text-foreground'
          size={27}
          strokeWidth={1.25}
        />
      </View>
    </TouchableOpacity>
  );
}
