import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='max-w-fd-container w-full mx-auto p-4'>
      <div className='flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
            A port of{' '}
            <a href='https://ui.shadcn.com' target='_blank'>
              shadcn/ui
            </a>
          </h1>
          <p className='max-w-2xl text-lg font-light text-foreground'>
            Bringing shadcn/ui to React Native. Beautifully crafted components with NativeWind, open
            source, and <i>almost</i> as easy to use.
          </p>
        </div>
        <div className='flex w-full items-center justify-start gap-2 pt-2'>
          <Button asChild size='sm'>
            <Link href='/docs'>Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
