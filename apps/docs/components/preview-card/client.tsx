'use client';

import { type SelectProps } from '@radix-ui/react-select';
import * as React from 'react';
import { CopyButton } from '@/components/copy-button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setCookie } from 'cookies-next';

const PLATFORMS = [
  { name: 'web', label: 'Web' },
  { name: 'ios', label: 'iOS' },
  { name: 'android', label: 'Android' },
] as const;

export type Platform = (typeof PLATFORMS)[number]['name'];

export type PreviewCardClientProps = {
  copyContent: string;
  webPreview: React.ReactNode;
  iosPreview?: React.ReactNode;
  androidPreview?: React.ReactNode;
  platformCookie?: Platform;
};

export function PreviewCardClient({
  copyContent,
  webPreview,
  iosPreview,
  androidPreview,
  platformCookie,
}: PreviewCardClientProps) {
  const [platform, setPlatform] = React.useState<Platform>(platformCookie ?? 'web');

  function onValueChange(value: Platform) {
    setPlatform(value);
    setCookie('platform', value);
    const event = new CustomEvent('cookieChange', { detail: { name: 'platform', value } });
    window.dispatchEvent(event);
  }

  return (
    <div className='group/copy relative flex flex-col min-h-96 border rounded-md bg-card p-4'>
      <div className='flex items-center justify-between'>
        <PlatformSwitcher
          onValueChange={onValueChange}
          defaultValue={platformCookie}
          setPlatform={setPlatform}
          value={platform}
        />
        <CopyButton className='group-hover/copy:opacity-100' content={copyContent} />
      </div>
      <div className='flex items-center justify-center p-6 flex-1'>
        {platform === 'android' ? androidPreview : platform === 'ios' ? iosPreview : webPreview}
      </div>
    </div>
  );
}

function PlatformSwitcher({
  setPlatform,
  ...props
}: SelectProps & { setPlatform: (value: Platform) => void }) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    function handleCookieChange(ev: Event) {
      const detail = (ev as Event & { detail: { name: string; value: Platform } }).detail;
      if (detail.name === 'platform') {
        setPlatform(detail.value);
      }
    }

    window.addEventListener('cookieChange', handleCookieChange);
    return () => {
      window.removeEventListener('cookieChange', handleCookieChange);
    };
  }, []);

  return (
    <Select {...props}>
      <SelectTrigger className='h-7 w-fit gap-1 text-xs pl-2.5 pr-1.5 [&_svg]:h-4 [&_svg]:w-4'>
        <span className='text-muted-foreground flex-1 pr-1'>Platform:</span>
        {!isClient ? (
          <span className='opacity-50'>
            {PLATFORMS.find((platform) => platform.name === props.value)?.label}
          </span>
        ) : (
          <SelectValue placeholder='Select platform' />
        )}
      </SelectTrigger>
      <SelectContent>
        {PLATFORMS.map((platform) => (
          <SelectItem key={platform.name} value={platform.name} className='text-xs'>
            {platform.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
