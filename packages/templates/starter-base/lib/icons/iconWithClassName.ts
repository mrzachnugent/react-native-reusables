import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { FC } from 'react';
import { IconProps } from './Icon';

export function iconWithClassName(icon: LucideIcon | FC<IconProps & LucideProps>) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
