'use client';

// This project uses code from fumadocs.
// The code is licensed under the MIT License.
// https://github.com/fuma-nama/fumadocs

import { cn } from '@docs/lib/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import * as React from 'react';
import { buttonVariants } from './ui/button';

export function CopyButton({
  className,
  content,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  content: string;
}): React.ReactElement {
  const onCopy = React.useCallback(() => {
    void navigator.clipboard.writeText(content ?? '');
  }, [content]);
  const [checked, onClick] = useCopyButton(onCopy);

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon',
        }),
        'size-7 transition-opacity group-hover:opacity-100',
        !checked && 'opacity-0',
        className
      )}
      aria-label="Copy Text"
      onClick={onClick}
      {...props}>
      <CheckIcon className={cn('!size-3.5 transition-transform', !checked && 'scale-0')} />
      <CopyIcon className={cn('absolute !size-3.5 transition-transform', checked && 'scale-0')} />
    </button>
  );
}

function useCopyButton(onCopy: () => void): [checked: boolean, onClick: React.MouseEventHandler] {
  const [checked, setChecked] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);
  const callbackRef = React.useRef(onCopy);
  callbackRef.current = onCopy;

  const onClick: React.MouseEventHandler = React.useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setChecked(false);
    }, 1500);
    callbackRef.current();
    setChecked(true);
  }, []);

  // Avoid updates after being unmounted
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return [checked, onClick];
}
