'use client';

import { useReactiveGetCookie } from 'cookies-next/client';
import * as React from 'react';

export type Style = 'default' | 'new-york';

export type ShowIfStyleProps = {
  style: Style;
  children: React.ReactNode;
};

export function ShowIfStyle({ style: styleProp, children }: ShowIfStyleProps) {
  const getCookie = useReactiveGetCookie();
  const style = getCookie('style') ?? 'default';

  if (styleProp !== style) {
    return null;
  }

  return <>{children}</>;
}
