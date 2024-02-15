import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerToggle } from '~/components/DrawerToggle';
import { ThemeToggle } from '~/components/ThemeToggle';
import { COMPONENTS } from '~/lib/constants';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName='(tabs)' screenOptions={screenOptions}>
        <Drawer.Screen
          name={'(tabs)'}
          options={{
            drawerLabel: 'Home',
            headerShown: false,
          }}
        />
        {COMPONENTS.map((name) => (
          <Drawer.Screen key={name} name={name} options={toOptions(name)} />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}

type RootDrawer = React.ComponentProps<typeof Drawer>;
type ScreenOptions = RootDrawer['screenOptions'];

const screenOptions: ScreenOptions = {
  headerLeft: () => <DrawerToggle />,
  headerRight: () => <ThemeToggle />,
};

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return {
    drawerLabel: title,
    headerTitle: title,
  };
}
