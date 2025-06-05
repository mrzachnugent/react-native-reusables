import { Tabs } from 'expo-router';
import { ModalToggle } from '@showcase/components/ModalToggle';
import { ThemeToggle } from '@showcase/components/ThemeToggle';
import { LayoutPanelLeft } from '@/lib/icons/LayoutPanelLeft';
import { MenuSquare } from '@/lib/icons/MenuSquare';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Demo',
          tabBarIcon({ color, size }) {
            return <LayoutPanelLeft color={color} size={size} />;
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='components'
        options={{
          title: 'Components',
          tabBarIcon({ color, size }) {
            return <MenuSquare color={color} size={size} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
