import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import * as React from 'react';

export function CodeBlockWrapper({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened} className='py-6'>
      <div className={cn('relative overflow-hidden', isOpened && 'pb-12')}>
        <CollapsibleContent
          forceMount
          className={cn('overflow-hidden', !isOpened && 'max-h-56')}
        >
          <div
            className={cn(
              '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]',
              !isOpened ? '[&_pre]:overflow-hidden' : '[&_pre]:overflow-auto]'
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            'absolute flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background/90  p-2',
            isOpened ? 'inset-x-0 bottom-0 h-12' : 'inset-0'
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant='default' className='h-8 text-xs cursor-pointer'>
              {isOpened ? 'Collapse' : 'View Code'}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
