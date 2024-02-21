import { Tabs } from 'expo-router';
import { Copy, ToyBrick } from 'lucide-react-native';

export default function ToolbarTabsLayout() {
  return (
    <>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name='index'
          options={{
            title: 'Reusable',
            tabBarIcon({ color, size }) {
              return <Copy color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='toolbar-primitive'
          options={{
            title: 'Primitive',
            tabBarIcon({ color, size }) {
              return <ToyBrick color={color} size={size} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}

type RootTabs = React.ComponentProps<typeof Tabs>;
type ScreenOptions = RootTabs['screenOptions'];

const screenOptions: ScreenOptions = {
  headerShown: false,
};
