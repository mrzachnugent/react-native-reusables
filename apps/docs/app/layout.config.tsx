import { UiIcon } from '@/components/ui-icon';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <div>Logo</div>,
  },
  links: [
    {
      text: 'shadcn/ui',
      url: 'https://ui.shadcn.com/',
      icon: <UiIcon />,
      external: true,
      on: 'menu',
    },
    {
      text: 'rn-primitives',
      url: 'https://rnprimitives.com',
      icon: <p className='bold px-1.5'>i</p>,
      external: true,
      on: 'menu',
    },
  ],
  githubUrl: 'https://github.com/mrzachnugent/react-native-reusables',
};
