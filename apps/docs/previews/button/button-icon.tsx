import { Button } from '~/components/ui/button';
import { ChevronRight } from '~/lib/icons/ChevronRight';

export function ButtonIconPreview() {
  return (
    <Button variant='outline' size='icon'>
      <ChevronRight className='h-4 w-4' />
    </Button>
  );
}
