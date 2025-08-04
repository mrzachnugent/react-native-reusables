'use client';

import type { SelectProps } from '@radix-ui/react-select';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@docs/components/ui/select';
import { useReactiveGetCookie, useReactiveSetCookie } from 'cookies-next/client';
import { Button } from '@docs/components/ui/button';

const INTEGRATIONS = [
  { name: 'none', label: 'None' },
  { name: 'clerk', label: 'Clerk' },
] as const;

type Integration = (typeof INTEGRATIONS)[number]['name'];

export function AuthIntegrationSelect({
  className,
  ...props
}: SelectProps & { className?: string }) {
  const [isClient, setIsClient] = React.useState(false);
  const [integration, onIntegrationChange] = useAuthIntegration();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Select {...props} defaultValue="none" value={integration} onValueChange={onIntegrationChange}>
      <Button asChild variant="outline" size="sm" className={className}>
        <SelectTrigger className="dark:bg-muted dark:hover:bg-muted/80 dark:border-muted-foreground/15 w-fit">
          <span className="text-muted-foreground flex-1 pr-1">Integration:</span>
          {!isClient ? (
            <span className="opacity-50">
              {
                INTEGRATIONS.find((integration) =>
                  integration.name === props.value ? props.value : props.defaultValue
                )?.label
              }
            </span>
          ) : (
            <SelectValue placeholder="Select integration" />
          )}
        </SelectTrigger>
      </Button>
      <SelectContent onCloseAutoFocus={preventDefault} className="dark:bg-neutral-900">
        {INTEGRATIONS.map((integration) => (
          <SelectItem key={integration.name} value={integration.name} className="text-xs">
            {integration.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function useAuthIntegration() {
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const integration = getCookie('user.auth-integration') ?? 'none';
  function onIntegrationChange(value: Integration) {
    setCookie('user.auth-integration', value);
  }

  return [integration, onIntegrationChange] as const;
}

function preventDefault(e: Event) {
  e.preventDefault();
}
