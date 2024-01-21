import { cva, type VariantProps } from 'class-variance-authority';
import * as LucideIcon from 'lucide-react-native';
import * as React from 'react';
import { Text } from 'react-native';
import * as TogglePrimitive from '~/lib/rn-primitives/toggle';
import { cn } from '~/lib/utils';

const toggleVariants = cva(
  'group web:inline-flex items-center justify-center rounded-md ring-offset-background web:transition-colors hover:bg-muted active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent active:bg-accent active:bg-accent',
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
          'group-hover:text-accent-foreground group-active:text-accent-foreground',
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

const ToggleContext = React.createContext<
  ({ pressed: boolean } & VariantProps<typeof toggleVariants>) | null
>(null);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleContext.Provider value={{ pressed: props.pressed, variant, size }}>
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
  </ToggleContext.Provider>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

function useToggleContext() {
  const context = React.useContext(ToggleContext);
  if (context === null) {
    throw new Error(
      'Toggle compound components cannot be rendered outside the Toggle component'
    );
  }
  return context;
}

const ToggleText = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { pressed, variant, size } = useToggleContext();
  return (
    <Text
      ref={ref}
      className={cn(
        toggleTextVariants({ variant, size }),
        pressed
          ? 'text-accent-foreground'
          : 'group-hover:text-muted-foreground',
        className
      )}
      {...props}
    />
  );
});

ToggleText.displayName = 'ToggleText';

const ToggleIcon = React.forwardRef<
  React.ElementRef<LucideIcon.Icon>,
  Omit<React.ComponentPropsWithoutRef<LucideIcon.Icon>, 'name'> & {
    name: keyof typeof LucideIcon;
  }
>(({ className, name, ...props }, ref) => {
  const { pressed, variant } = useToggleContext();

  const Icon = LucideIcon[name] as LucideIcon.Icon;
  return (
    <Icon
      ref={ref}
      className={cn(
        toggleTextVariants({ variant }),
        pressed
          ? 'text-accent-foreground'
          : 'group-hover:text-muted-foreground',
        className
      )}
      {...props}
    />
  );
});

ToggleIcon.displayName = 'ToggleIcon';

export { Toggle, ToggleText, ToggleIcon, toggleVariants, toggleTextVariants };
