'use client';

import { cn } from '@/registry/new-york/lib/utils';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Platform } from 'react-native';

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.RootProps & {
  ref?: React.RefObject<RadioGroupPrimitive.RootRef>;
}) {
  return <RadioGroupPrimitive.Root className={cn('gap-3', className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: RadioGroupPrimitive.ItemProps & {
  ref?: React.RefObject<RadioGroupPrimitive.ItemRef>;
}) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-input dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-sm justify-center items-center',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed',
          native: 'shadow-black/5',
        }),
        props.disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='size-2 bg-primary rounded-full' />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
