import { Button } from '@rnr/components/ui/button';
import { ChevronRight } from '@rnr/lib/icons/ChevronRight';

export function ButtonIconPreview() {
  return (
    <Button variant='outline' size='icon'>
      <ChevronRight className='h-4 w-4' />
    </Button>
  );
}
