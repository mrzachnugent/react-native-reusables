import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { RnrIcon } from '@docs/components/icons/rnr-icon';
import Link from 'next/link';
import { Button } from '@docs/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React Native Reusables',
  description: 'Bringing the shadcn/ui design system to React Native',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      githubUrl='https://github.com/mrzachnugent/react-native-reusables'
      nav={{
        title: (
          <div className='flex items-center justify-center size-8 rounded-md hover:bg-fd-accent transition-colors duration-200 -ml-0.5'>
            <RnrIcon className='w-6' pathClassName='stroke-[1px]' />
          </div>
        ),
        children: (
          <div className='flex items-center gap-4 -ml-0.5'>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='hover:bg-fd-accent dark:hover:bg-fd-accent'
            >
              <Link href='/docs'>Docs</Link>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='hover:bg-fd-accent dark:hover:bg-fd-accent'
            >
              <Link href='/docs/components/accordion'>Components</Link>
            </Button>
          </div>
        ),
      }}
    >
      {children}
    </HomeLayout>
  );
}
