import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function LinkButton({ children, ...props }: React.ComponentProps<'a'>) {
  return (
    <Button size='xs' variant='secondary' className='gap-1.5 no-underline' asChild>
      <a {...props}>
        {children}
        <ExternalLink size={12} style={{ margin: 0 }} />
      </a>
    </Button>
  );
}
