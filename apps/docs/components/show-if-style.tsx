'use client';

import { useStyle } from '@docs/lib/style-provider';
import * as React from 'react';

export type Style = 'default' | 'new-york';

export type ShowIfStyleProps = {
  style: Style;
  children: React.ReactNode;
};

export function ShowIfStyle({ style: styleProp, children }: ShowIfStyleProps) {
  const { style } = useStyle();

  if (styleProp !== style) {
    return null;
  }

  return <>{children}</>;
}
