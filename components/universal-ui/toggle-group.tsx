import { VariantProps } from 'class-variance-authority';
import * as LucideIcon from 'lucide-react-native';
import * as React from 'react';
import {
  toggleTextVariants,
  toggleVariants,
} from '~/components/universal-ui/toggle';
import { TextClassContext } from '~/components/universal-ui/typography';
import * as ToggleGroupPrimitive from '~/lib/rn-primitives/toggle-group';
import { cn } from '~/lib/utils';

const ToggleGroupContext = React.createContext<VariantProps<
  typeof toggleVariants
> | null>(null);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-row items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();

  return (
    <TextClassContext.Provider
      value={cn(
        toggleTextVariants({ variant, size }),
        ToggleGroupPrimitive.utils.getIsSelected(value, props.value)
          ? 'text-accent-foreground'
          : 'group-hover:text-muted-foreground'
      )}
    >
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          props.disabled && 'web:pointer-events-none opacity-50',
          ToggleGroupPrimitive.utils.getIsSelected(value, props.value) &&
            'bg-accent',
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

const ToggleGroupIcon = React.forwardRef<
  React.ElementRef<LucideIcon.Icon>,
  Omit<React.ComponentPropsWithoutRef<LucideIcon.Icon>, 'name'> & {
    name: keyof typeof LucideIcon;
  }
>(({ className, name, ...props }, ref) => {
  const textClass = React.useContext(TextClassContext);

  const Icon = LucideIcon[name] as LucideIcon.Icon;
  return <Icon ref={ref} className={cn(textClass, className)} {...props} />;
});

ToggleGroupIcon.displayName = 'ToggleGroupIcon';

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };
