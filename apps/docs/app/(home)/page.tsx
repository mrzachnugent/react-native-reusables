import { Badge } from '@docs/components/ui/badge';
import { Button } from '@docs/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='max-w-fd-container w-full mx-auto flex flex-col items-center gap-4'>
      <div className='container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4'>
        <div className='h-6'>
          <Badge
            variant='outline'
            className='bg-card dark:bg-secondary border-border/70 shadow-sm font-normal gap-1 pr-2'
          >
            Download the app <ArrowRightIcon className='size-3' />
          </Badge>
        </div>
        <h1 className='text-primary/90 leading-tighter max-w-3xl xl:max-w-7xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] xl:font-medium xl:text-5xl xl:tracking-tighter'>
          Build your Universal Component Library
        </h1>
        <p className='text-foreground/80 max-w-3xl text-base text-balance sm:text-lg'>
          Bringing{' '}
          <a href='https://ui.shadcn.com' target='_blank'>
            shadcn/ui
          </a>{' '}
          to React Native. Beautifully crafted components with Nativewind, open source, and{' '}
          <i>almost as easy to use.</i>
        </p>
        <div className='flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none'>
          <Button asChild size='sm'>
            <Link href='/docs'>Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
