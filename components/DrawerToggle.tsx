import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { AlignJustify } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { cn } from '~/lib/utils';

export function DrawerToggle() {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  return (
    <Pressable
      onPress={navigation.toggleDrawer}
      className='ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-1 aspect-square justify-center items-end pt-0.5 web:pl-4',
            pressed && 'opacity-70'
          )}
        >
          <AlignJustify
            className='text-foreground'
            size={24}
            strokeWidth={1.25}
          />
        </View>
      )}
    </Pressable>
  );
}
