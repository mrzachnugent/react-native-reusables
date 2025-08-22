'use client';

import { Button } from '@docs/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@docs/components/ui/select';
import { type SelectProps } from '@radix-ui/react-select';
import { useReactiveGetCookie, useReactiveSetCookie } from 'cookies-next/client';
import * as React from 'react';

const PLATFORMS = [
  { name: 'web', label: 'Web' },
  { name: 'native', label: 'Native' },
] as const;

type Platform = (typeof PLATFORMS)[number]['name'];

export function PlatformSelect(props: SelectProps) {
  const [isClient, setIsClient] = React.useState(false);
  const [platform, onPlatformChange] = usePlatform();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Select {...props} defaultValue="web" value={platform} onValueChange={onPlatformChange}>
      <Button asChild variant="outline" size="sm">
        <SelectTrigger className="dark:bg-muted dark:hover:bg-muted/80 dark:border-muted-foreground/15 w-fit">
          <span className="text-muted-foreground flex-1 pr-1">Platform:</span>
          {!isClient ? (
            <span className="opacity-50">
              {
                PLATFORMS.find((platform) =>
                  platform.name === props.value ? props.value : props.defaultValue
                )?.label
              }
            </span>
          ) : (
            <SelectValue placeholder="Select platform" />
          )}
        </SelectTrigger>
      </Button>
      <SelectContent onCloseAutoFocus={preventDefault} className="dark:bg-neutral-900">
        {PLATFORMS.map((platform) => (
          <SelectItem key={platform.name} value={platform.name} className="text-xs">
            {platform.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function usePlatform() {
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const platform = getCookie('user.platform') ?? 'web';
  function onPlatformChange(value: Platform) {
    setCookie('user.platform', value);
  }
  return [platform, onPlatformChange] as const;
}

function preventDefault(e: Event) {
  e.preventDefault();
}
