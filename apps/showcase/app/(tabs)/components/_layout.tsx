import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  useTheme,
  type ParamListBase,
  type TabNavigationState,
} from '@react-navigation/native';
import { Stack, withLayoutContext } from 'expo-router';
import { useWindowDimensions } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MaterialTopTabsLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <MaterialTopTabs
        initialRouteName='index'
        screenOptions={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: 'none',
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.text,
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: width / 2 },
        }}
      >
        <MaterialTopTabs.Screen
          name='index'
          options={{
            title: 'UI',
          }}
        />
        <MaterialTopTabs.Screen
          name='primitives'
          options={{
            title: 'Primitives',
          }}
        />
      </MaterialTopTabs>
    </>
  );
}
