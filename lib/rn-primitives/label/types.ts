import type { ViewStyle } from 'react-native';

interface LabelRootProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface LabelTextProps {
  nativeID: string;
}

export type { LabelRootProps, LabelTextProps };
