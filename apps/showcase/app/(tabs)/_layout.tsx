import { Tabs } from 'expo-router';
import { ModalToggle } from '@showcase/components/ModalToggle';
import { ThemeToggle } from '@showcase/components/ThemeToggle';
import { LayoutPanelLeft, MenuSquare } from 'lucide-react-native';
import { Icon } from '@/new-york/components/ui/icon';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Demo',
          tabBarIcon({ color, size }) {
            return <Icon as={LayoutPanelLeft} color={color} size={size} />;
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
            return <Icon as={MenuSquare} color={color} size={size} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
