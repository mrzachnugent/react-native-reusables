import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type {
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '~/lib/constants';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MaterialTopTabsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <MaterialTopTabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: NAV_THEME[colorScheme].text,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: NAV_THEME[colorScheme].text,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name='index'
        options={{
          title: 'Blue',
        }}
      />
      <MaterialTopTabs.Screen
        name='red'
        options={{
          title: 'Red',
        }}
      />
      <MaterialTopTabs.Screen
        name='green'
        options={{
          title: 'Green',
        }}
      />
      <MaterialTopTabs.Screen
        name='purple'
        options={{
          title: 'Purple',
        }}
      />
    </MaterialTopTabs>
  );
}
