import { CircleCheckIcon, CircleXIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { cn } from '@docs/lib/utils';

const ICONS = {
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: CircleXIcon,
  success: CircleCheckIcon,
};

type CalloutProps = Omit<React.ComponentProps<'div'>, 'title' | 'type' | 'icon'> & {
  title?: React.ReactNode;
  /**
   * @defaultValue info
   */
  type?: 'info' | 'warn' | 'error' | 'success' | 'warning';
};

export function Callout({ className, children, title, type = 'info', ...props }: CalloutProps) {
  if (type === 'warn') {
    type = 'warning';
  }

  const Icon = ICONS[type];

  return (
    <div
      className={cn(
        'flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      <div role='none' className='w-0.5' />
      <Icon className='size-4 mt-0.5' />
      <div className='flex flex-col gap-2 min-w-0 flex-1'>
        {title && <p className='font-medium !my-0'>{title}</p>}
        <div className='text-fd-muted-foreground prose-no-margin empty:hidden'>{children}</div>
      </div>
    </div>
  );
}
