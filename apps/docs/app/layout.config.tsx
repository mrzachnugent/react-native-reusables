import { UiIcon } from '@docs/components/icons/ui-icon';
import { RnrIcon } from '@docs/components/icons/rnr-icon';
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
      <div className='group flex items-center gap-2'>
        <RnrIcon className='transition-transform opacity-80 duration-500 group-hover:rotate-180 group-hover:scale-95 flex-shrink-0' />
        <p className='font-medium text-[1.175rem]'>Reusables</p>
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
