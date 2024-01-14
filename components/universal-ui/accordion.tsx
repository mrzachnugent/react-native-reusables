import * as React from 'react';
import * as AccordionPrimitive from '~/lib/rn-primitives/accordion';

import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, value, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('border-b border-border', className)}
      value={value}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof View> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  const { value } = AccordionPrimitive.useRootContext();
  const { value: itemValue } = AccordionPrimitive.useItemContext();
  const isOpen = Array.isArray(value)
    ? value.includes(itemValue)
    : value === itemValue;

  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger ref={ref} asChild>
        <View
          className={cn(
            'flex flex-row flex-1 items-center justify-between py-4 font-medium transition-all group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground',
            className
          )}
          {...props}
        >
          {children}

          {!isOpen ? (
            <ChevronDown size={18} className={'text-foreground shrink-0'} />
          ) : (
            <ChevronUp size={18} className={'text-foreground shrink-0'} />
          )}
        </View>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { value } = AccordionPrimitive.useRootContext();
  const { value: itemValue } = AccordionPrimitive.useItemContext();
  const isOpen = Array.isArray(value)
    ? value.includes(itemValue)
    : value === itemValue;
  return (
    <AccordionPrimitive.Content
      className={cn(
        'overflow-hidden text-sm transition-all',
        isOpen ? 'animate-accordion-down' : 'animate-accordion-up'
      )}
      {...props}
    >
      <View ref={ref} className={cn('pb-4', className)}>
        {children}
      </View>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
