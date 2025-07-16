import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@docs/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout githubUrl='https://github.com/mrzachnugent/react-native-reusables' {...baseOptions}>
      {children}
    </HomeLayout>
  );
}
