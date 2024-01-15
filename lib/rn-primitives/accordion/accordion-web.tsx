import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';
import { View } from 'react-native';
import * as Slot from '../slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
} from './types';
import { useAugmentedRef } from '../hooks/useAugmentedRef';

const AccordionContext = React.createContext<AccordionRootProps | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & AccordionRootProps>(
  (
    {
      asChild,
      value,
      onValueChange,
      type,
      disabled,
      dir,
      orientation = 'vertical',
      collapsible,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <AccordionContext.Provider
        value={
          {
            value,
            onValueChange,
            type,
            disabled,
            dir,
            orientation,
          } as AccordionRootProps
        }
      >
        <Accordion.Root
          asChild
          value={value as any}
          onValueChange={onValueChange as any}
          type={type as any}
          disabled={disabled}
          dir={dir}
          orientation={orientation}
          collapsible={collapsible}
        >
          <Component ref={ref} {...props} />
        </Accordion.Root>
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'RootWebAccordion';

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

const AccordionItemContext = React.createContext<
  (AccordionItemProps & { isExpanded: boolean }) | null
>(null);

const Item = React.forwardRef<ViewRef, AccordionItemProps & SlottableViewProps>(
  ({ asChild, value: itemValue, disabled, ...props }, ref) => {
    const augmentedRef = React.useRef<ViewRef>(null);
    useAugmentedRef({ augmentedRef, ref });
    const {
      value,
      orientation,
      disabled: disabledRoot,
    } = useAccordionContext();

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        const isExpanded = Array.isArray(value)
          ? value.includes(itemValue)
          : value === itemValue;
        augRef.dataset.state = isExpanded ? 'open' : 'closed';
      }
    }, [value, itemValue]);

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.orientation = orientation;
        if (disabled || disabledRoot) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [orientation, disabled, disabledRoot]);

    const Component = asChild ? Slot.View : View;
    return (
      <AccordionItemContext.Provider
        value={{
          value: itemValue,
          disabled,
          isExpanded: isItemExpanded(value, itemValue),
        }}
      >
        <Accordion.Item value={itemValue} disabled={disabled} asChild>
          <Component ref={augmentedRef} {...props} />
        </Accordion.Item>
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemWebAccordion';

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

const Header = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const augmentedRef = React.useRef<ViewRef>(null);
    useAugmentedRef({ augmentedRef, ref });
    const { disabled, isExpanded } = useAccordionItemContext();
    const { orientation, disabled: disabledRoot } = useAccordionContext();

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.state = isExpanded ? 'open' : 'closed';
      }
    }, [isExpanded]);

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.orientation = orientation;
        if (disabled || disabledRoot) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [orientation, disabled, disabledRoot]);

    const Component = asChild ? Slot.View : View;
    return (
      <Accordion.Header asChild>
        <Component ref={augmentedRef} {...props} />
      </Accordion.Header>
    );
  }
);

Header.displayName = 'HeaderWebAccordion';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, disabled: disabledProp, ...props }, ref) => {
    const { disabled: disabledRoot } = useAccordionContext();
    const { disabled, isExpanded } = useAccordionItemContext();
    const augmentedRef = React.useRef<PressableRef>(null);
    useAugmentedRef({ augmentedRef, ref });

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;

        augRef.dataset.state = isExpanded ? 'expanded' : 'closed';
      }
    }, [isExpanded]);

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;

        if (disabled || disabledRoot || disabledProp) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [disabled, disabledRoot, disabledProp]);

    const Component = asChild ? Slot.Pressable : Slot.Pressable;
    return (
      <Accordion.Trigger
        disabled={disabledProp ?? disabledRoot ?? disabled}
        asChild
      >
        <Component
          ref={augmentedRef}
          role='button'
          disabled={disabledProp ?? disabledRoot ?? disabled}
          {...props}
        />
      </Accordion.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebAccordion';

const Content = React.forwardRef<
  ViewRef,
  AccordionContentProps & SlottableViewProps
>(({ asChild, forceMount, ...props }, ref) => {
  const augmentedRef = React.useRef<ViewRef>(null);
  useAugmentedRef({ augmentedRef, ref });

  const { orientation, disabled: disabledRoot } = useAccordionContext();
  const { disabled, isExpanded } = useAccordionItemContext();
  React.useLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = isExpanded ? 'expanded' : 'closed';
    }
  }, [isExpanded]);

  React.useLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;

      if (disabled || disabledRoot) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [orientation, disabled, disabledRoot]);

  const Component = asChild ? Slot.View : View;
  return (
    <Accordion.Content forceMount={forceMount} asChild>
      <Component ref={augmentedRef} {...props} />
    </Accordion.Content>
  );
});

Content.displayName = 'ContentWebAccordion';

export {
  Content,
  Header,
  Item,
  Root,
  Trigger,
  useAccordionContext,
  useAccordionItemContext,
};

function isItemExpanded(
  rootValue: string | string[] | undefined,
  value: string
) {
  return Array.isArray(rootValue)
    ? rootValue.includes(value)
    : rootValue === value;
}
