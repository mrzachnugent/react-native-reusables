import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { Platform } from 'react-native';
import { Check } from '../../lib/icons/Check';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends CheckboxPrimitive.RootProps {
  checkedClassName?: string;
  uncheckedClassName?: string;
  indicatorClassName?: string;
  iconClassName?: string;
  iconCheckedClassName?: string;
  iconUncheckedClassName?: string;
  renderIcon?: (opts: { checked: boolean }) => React.ReactNode;
}

/** Internal implementation (normal function). */
function CheckboxImpl(
  {
    className,
    checkedClassName,
    uncheckedClassName,
    indicatorClassName,
    iconClassName,
    iconCheckedClassName,
    iconUncheckedClassName,
    renderIcon,
    checked,
    ...props
  }: CheckboxProps,
  ref: React.ForwardedRef<CheckboxPrimitive.RootRef>
) {
  const baseRoot =
    'web:peer h-4 w-4 native:h-[20] native:w-[20] shrink-0 rounded-sm native:rounded ' +
    'border web:ring-offset-background web:focus-visible:outline-none ' +
    'web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:opacity-50';

  // Defaults so "just checked/onCheckedChange" works
  const defaultUnchecked = 'border-primary';
  const defaultChecked = ['bg-primary', 'border-primary'];
  const defaultIconChecked = 'text-primary-foreground';

  const rootClasses = cn(
    baseRoot,
    defaultUnchecked,
    checked && defaultChecked,
    checked ? checkedClassName : uncheckedClassName,
    className
  );

  const iconClasses = cn(
    checked && defaultIconChecked,
    iconClassName,
    checked ? iconCheckedClassName : iconUncheckedClassName
  );

  return (
    <CheckboxPrimitive.Root ref={ref} checked={checked} className={rootClasses} {...props}>
      <CheckboxPrimitive.Indicator
        className={cn('items-center justify-center h-full w-full', indicatorClassName)}
      >
        {renderIcon ? (
          renderIcon({ checked: !!checked })
        ) : (
          <Check
            size={12}
            strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
            className={iconClasses}
          />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

/** Make a forwardRef component… */
const ForwardedCheckbox = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxProps>(CheckboxImpl);
ForwardedCheckbox.displayName = 'Checkbox';
export function Checkbox(props: CheckboxProps) {
  return <ForwardedCheckbox {...props} />;
}
