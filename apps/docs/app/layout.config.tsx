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
      <div className='flex items-center text-foreground/80 gap-1 opacity-90 hover:opacity-100 transition-opacity duration-200'>
        <div className='size-8 flex items-center justify-center'>
          <RnrIcon />
        </div>
        <p className='text-[1.15rem] font-normal pr-1'>Reusables</p>
      </div>
    ),
  },
};
