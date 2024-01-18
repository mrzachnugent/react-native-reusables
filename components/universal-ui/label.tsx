import * as React from 'react';
import * as LabelPrimitive from '~/lib/rn-primitives/label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const labelVariants = cva(
  'text-sm text-foreground native:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('web:cursor-default', className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const LabelText = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Text
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
LabelText.displayName = LabelPrimitive.Text.displayName;

export { Label, LabelText };
