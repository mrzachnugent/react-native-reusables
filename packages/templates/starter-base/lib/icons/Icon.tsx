import { icons, LucideProps } from 'lucide-react-native';

import { FC } from 'react';
import { iconWithClassName } from './iconWithClassName';

export interface IconProps {
  name: keyof typeof icons;
}

const Icon: FC<IconProps & LucideProps> = ({ name, ...stuff }) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...stuff} />;
};

iconWithClassName(Icon);

export default Icon;
