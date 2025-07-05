'use client';

import { type SelectProps } from '@radix-ui/react-select';
import * as React from 'react';

import { Button } from '@docs/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@docs/components/ui/select';
import { useReactiveGetCookie, useReactiveSetCookie } from 'cookies-next/client';

const PLATFORMS = [
  { name: 'web', label: 'Web' },
  { name: 'native', label: 'Native' },
] as const;

const STYLES = [
  { name: 'default', label: 'Default' },
  { name: 'new-york', label: 'New York' },
] as const;

type Platform = (typeof PLATFORMS)[number]['name'];
type Style = (typeof STYLES)[number]['name'];

type PreviewCardProps = {
  webPreview: React.ReactNode;
  webNewYorkPreview?: React.ReactNode;
};

const DEFAULT_STYLE_RADIUS = { '--radius': '0.5rem' } as React.CSSProperties;

export function PreviewCard({ webPreview, webNewYorkPreview }: PreviewCardProps) {
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const platform = getCookie('platform') ?? 'web';
  const style = getCookie('style') ?? 'default';

  function onPlatformChange(value: Platform) {
    setCookie('platform', value);
  }
  function onStyleChange(value: Style) {
    setCookie('style', value);
  }

  function selectWebPreview() {
    onPlatformChange('web');
  }

  return (
    <div className='group/copy relative flex flex-col min-h-[450px] border rounded-md bg-card p-4 not-prose'>
      <div className='flex items-center justify-between'>
        <StyleSwitcher onValueChange={onStyleChange} defaultValue='default' value={style} />
        <PlatformSwitcher onValueChange={onPlatformChange} defaultValue='web' value={platform} />
      </div>
      <div
        style={style === 'default' ? DEFAULT_STYLE_RADIUS : undefined}
        className='flex flex-col items-center justify-center p-6 flex-1'
      >
        {platform === 'native' ? (
          <ComingSoon selectWebPreview={selectWebPreview} />
        ) : style === 'new-york' ? (
          webNewYorkPreview
        ) : (
          webPreview
        )}
      </div>
    </div>
  );
}

function PlatformSwitcher(props: SelectProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Select {...props}>
      <SelectTrigger className='h-7 w-fit gap-1 text-xs pl-2.5 pr-1.5 [&_svg]:h-4 [&_svg]:w-4'>
        <span className='text-muted-foreground flex-1 pr-1'>Platform:</span>
        {!isClient ? (
          <span className='opacity-50'>
            {
              PLATFORMS.find((platform) =>
                platform.name === props.value ? props.value : props.defaultValue
              )?.label
            }
          </span>
        ) : (
          <SelectValue placeholder='Select platform' />
        )}
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={preventDefault}>
        {PLATFORMS.map((platform) => (
          <SelectItem key={platform.name} value={platform.name} className='text-xs'>
            {platform.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function StyleSwitcher(props: SelectProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Select {...props}>
      <SelectTrigger className='h-7 w-fit gap-1 text-xs pl-2.5 pr-1.5 [&_svg]:h-4 [&_svg]:w-4'>
        <span className='text-muted-foreground flex-1 pr-1'>Style:</span>
        {!isClient ? (
          <span className='opacity-50'>
            {
              STYLES.find((style) =>
                style.name === props.value ? props.value : props.defaultValue
              )?.label
            }
          </span>
        ) : (
          <SelectValue placeholder='Select style' />
        )}
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={preventDefault}>
        {STYLES.map((style) => (
          <SelectItem key={style.name} value={style.name} className='text-xs'>
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ComingSoon({ selectWebPreview }: { selectWebPreview: () => void }) {
  return (
    <div className='p-4 max-w-sm text-center space-y-1'>
      <div className='flex justify-center'>
        <p className='text-lg'>Coming soon</p>
        <span className='text-[0.5rem] pt-1'>TM</span>
      </div>
      <p className='text-sm text-fd-muted-foreground pb-4'>
        We&apos;re working on it. In the meantime, you can check out the web preview.
      </p>

      <Button
        variant='secondary'
        size='sm'
        className='border border-border/50 text-xs'
        onClick={selectWebPreview}
      >
        View Web Preview
      </Button>
    </div>
  );
}

function preventDefault(e: Event) {
  e.preventDefault();
}
