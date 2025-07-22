import { RnrIcon } from '@docs/components/icons/rnr-icon';
import { SkipNavigationButton } from '@docs/components/skip-navigation-button';
import { Button } from '@docs/components/ui/button';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'React Native Reusables',
  description:
    'Bringing shadcn/ui to React Native. Beautifully crafted components with Nativewind, open source, and almost as easy to use.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipNavigationButton />
      <HomeLayout
        githubUrl='https://github.com/mrzachnugent/react-native-reusables'
        nav={{
          title: (
            <div className='flex items-center justify-center size-8 rounded-md hover:bg-fd-accent transition-colors duration-200 -ml-0.5'>
              <RnrIcon className='w-6' pathClassName='stroke-[1px]' />
            </div>
          ),
        }}
        links={[
          {
            type: 'custom',
            children: (
              <Button
                variant='ghost'
                size='sm'
                asChild
                className='hover:bg-fd-accent dark:hover:bg-fd-accent justify-start sm:justify-center -ml-1.5 sm:ml-0'
              >
                <Link href='/docs'>Docs</Link>
              </Button>
            ),
          },
          {
            type: 'custom',
            children: (
              <Button
                variant='ghost'
                size='sm'
                asChild
                className='hover:bg-fd-accent dark:hover:bg-fd-accent justify-start sm:justify-center -ml-1.5 sm:ml-0'
              >
                <Link href='/docs/blocks/authentication'>Blocks</Link>
              </Button>
            ),
          },
          {
            type: 'custom',
            children: (
              <Button
                variant='ghost'
                size='sm'
                asChild
                className='hover:bg-fd-accent dark:hover:bg-fd-accent justify-start sm:justify-center -ml-1.5 sm:ml-0'
              >
                <Link href='/docs/components/accordion'>Components</Link>
              </Button>
            ),
          },
        ]}
      >
        {children}
      </HomeLayout>
    </>
  );
}
