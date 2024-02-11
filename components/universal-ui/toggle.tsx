import { cva, type VariantProps } from 'class-variance-authority';
import * as LucideIcon from 'lucide-react-native';
import * as React from 'react';
import { TextClassContext } from '~/components/universal-ui/typography';
import * as TogglePrimitive from '~/lib/rn-primitives/toggle';
import { cn } from '~/lib/utils';

const toggleVariants = cva(
  'web:group web:inline-flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:hover:bg-muted active:bg-muted web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent web:hover:bg-accent active:bg-accent active:bg-accent',
      },
      size: {
        default: 'h-10 px-3 native:h-12 native:px-[12]',
        sm: 'h-9 px-2.5 native:h-10 native:px-[9]',
        lg: 'h-11 px-5 native:h-14 native:px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const toggleTextVariants = cva(
  'text-sm native:text-base text-foreground font-medium',
  {
    variants: {
      variant: {
        default: '',
        outline:
          'web:group-hover:text-accent-foreground web:group-active:text-accent-foreground',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn(
      toggleTextVariants({ variant, size }),
      props.pressed
        ? 'text-accent-foreground'
        : 'web:group-hover:text-muted-foreground',
      className
    )}
  >
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        props.disabled && 'web:pointer-events-none opacity-50',
        props.pressed && 'bg-accent',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

const ToggleIcon = React.forwardRef<
  React.ElementRef<LucideIcon.Icon>,
  Omit<React.ComponentPropsWithoutRef<LucideIcon.Icon>, 'name'> & {
    name: keyof typeof LucideIcon;
  }
>(({ className, name, ...props }, ref) => {
  const textClass = React.useContext(TextClassContext);

  const Icon = LucideIcon[name] as LucideIcon.Icon;
  return <Icon ref={ref} className={cn(textClass, className)} {...props} />;
});

ToggleIcon.displayName = 'ToggleIcon';

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
