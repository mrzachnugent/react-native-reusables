import { Platform } from 'react-native';

const DEFAULT_SHADOW_COLOR = 'rgba(0, 0, 0, 0.25)';
const DEFAULT_DARKER_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)';

export const shadow = {
  sm: {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: Platform.OS === 'android' ? 1 : 0,
  },
  base: {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.19,
    shadowRadius: 2.25,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  md: {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  lg: {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    elevation: Platform.OS === 'android' ? 6 : 0,
  },
  xl: {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6.5,
    elevation: Platform.OS === 'android' ? 12 : 0,
  },
  '2xl': {
    shadowColor: DEFAULT_DARKER_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 18 : 0,
  },
  '3xl': {
    shadowColor: DEFAULT_DARKER_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 14.5,
    elevation: Platform.OS === 'android' ? 24 : 0,
  },
} as const;
