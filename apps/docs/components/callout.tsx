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

export function Callout({ className, children, title, type, ...props }: CalloutProps) {
  if (type === 'warn') {
    type = 'warning';
  }

  const Icon = type ? ICONS[type] : null;

  return (
    <div
      className={cn(
        'bg-fd-card text-fd-card-foreground my-4 flex gap-2 rounded-xl border p-3 ps-1 text-sm shadow-sm',
        className
      )}
      {...props}>
      <div role="none" className={!type ? 'w-1' : 'w-0.5'} />
      {Icon && <Icon className="mt-0.5 size-4" />}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {title && <p className="!my-0 font-medium">{title}</p>}
        <div className="text-fd-muted-foreground prose-no-margin empty:hidden">{children}</div>
      </div>
    </div>
  );
}
