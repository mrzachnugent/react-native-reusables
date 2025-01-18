'use client';

import { type SelectProps } from '@radix-ui/react-select';
import * as React from 'react';
import { CopyButton } from './copy-button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PLATFORMS = [
  { name: 'web', label: 'Web' },
  { name: 'ios', label: 'iOS' },
  { name: 'android', label: 'Android' },
];

type Platform = (typeof PLATFORMS)[number]['name'];

export function PreviewCard({
  copyContent,
  webPreview,
  iosPreview,
  androidPreview,
}: {
  copyContent: string;
  webPreview: React.ReactNode;
  iosPreview?: React.ReactNode;
  androidPreview?: React.ReactNode;
}) {
  const [platform, setPlatform] = React.useState<Platform>(
    (localStorage.getItem('platform') as Platform | null) ?? 'web'
  );
  return (
    <div className='group/copy relative flex flex-col min-h-96 border rounded-md bg-card p-4'>
      <div className='flex items-center justify-between'>
        <PlatformSwitcher
          onValueChange={(value: Platform) => {
            setPlatform(value);
            localStorage.setItem('platform', value);
          }}
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
  defaultValue = window !== undefined ? localStorage.getItem('platform') ?? 'web' : 'web',
  ...props
}: SelectProps) {
  return (
    <Select defaultValue={defaultValue} {...props}>
      <SelectTrigger className='h-7 w-fit gap-1 text-xs [&_svg]:h-4 [&_svg]:w-4'>
        <span className='text-muted-foreground flex-1 pr-1'>Platform:</span>
        <SelectValue placeholder='Select platform' />
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
