import { UiIcon } from '@/components/icons/ui-icon';
import { RnrIcon } from '@/components/icons/rnr-icon';
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
    title: (
      <div className='group flex items-center gap-1.5'>
        <RnrIcon
          strokeWidth={32}
          className='transition-transform duration-500 group-hover:rotate-180 group-hover:scale-90'
        />
        <p className='opacity-80 dark:opacity-90 transition-opacity group-hover:opacity-100'>RNR</p>
      </div>
    ),
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
