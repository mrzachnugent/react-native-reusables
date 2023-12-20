import { Tabs } from 'expo-router';
import { LayoutPanelLeft, MenuSquare } from 'lucide-react-native';
import { DrawerToggle } from '~/components/DrawerToggle';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Example',
          tabBarIcon({color, size}) {
            return <LayoutPanelLeft color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name='components'
        options={{
          title: 'Components',
          tabBarIcon({color, size}) {
            return <MenuSquare color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}

type RootTabs = React.ComponentProps<typeof Tabs>;
type ScreenOptions = RootTabs['screenOptions'];

const screenOptions: ScreenOptions = {
  headerLeft: () => <DrawerToggle />,
  headerRight: () => <ThemeToggle />,
};
