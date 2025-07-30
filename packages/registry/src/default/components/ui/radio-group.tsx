import { cn } from '@/registry/default/lib/utils';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Platform } from 'react-native';

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.RootProps & {
  ref?: React.RefObject<RadioGroupPrimitive.RootRef | null>;
}) {
  return <RadioGroupPrimitive.Root className={cn('gap-2', className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: RadioGroupPrimitive.ItemProps & {
  ref?: React.RefObject<RadioGroupPrimitive.ItemRef | null>;
}) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-primary aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-full border shadow-sm shadow-black/5',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
        }),
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="bg-primary size-2 rounded-full" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
