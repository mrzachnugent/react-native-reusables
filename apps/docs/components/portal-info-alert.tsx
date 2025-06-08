import { Alert, AlertDescription, AlertTitle } from '@docs/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';

export function PortalInfoAlert() {
  return (
    <Alert>
      <InfoIcon className='h-4 w-4 ' />
      <AlertTitle className='pb-0.5'>Note</AlertTitle>
      <AlertDescription>
        A{' '}
        <Link href='/docs/portal' className='hover:underline'>
          <code className='text-[0.813rem] bg-muted py-0.5 px-1 rounded-sm'>PortalHost</code>
        </Link>{' '}
        is required at the root of your project for this to work on native platforms.
      </AlertDescription>
    </Alert>
  );
}
