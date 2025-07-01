import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import { Platform } from 'react-native';

const DEFAULT_HIT_SLOP = 12;

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  ...props
}: CheckboxPrimitive.RootProps & {
  checkedClassName?: string;
  indicatorClassName?: string;
  ref?: React.RefObject<CheckboxPrimitive.RootRef>;
}) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'border-input dark:bg-input/30 size-4 shrink-0 rounded-[4px] border shadow-sm',
        Platform.select({
          web: 'peer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed cursor-default',
          native: 'shadow-black/5',
        }),
        props.checked && cn('border-primary', checkedClassName),
        props.disabled && 'opacity-50',
        className
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('items-center justify-center h-full w-full bg-primary', indicatorClassName)}
      >
        <Icon
          as={Check}
          size={12}
          strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
          className='text-primary-foreground'
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
