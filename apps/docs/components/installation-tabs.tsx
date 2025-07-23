'use client';

import {
  LinkTabs,
  LinkTabsList,
  LinkTabsTrigger,
  LinkTabsContent,
} from '@docs/components/link-tabs';
import * as React from 'react';

function InstallationTabs({
  value,
  children,
}: {
  value: 'cli' | 'manual';
  children: React.ReactNode;
}) {
  return (
    <LinkTabs
      ref={onRef(value)}
      value={value === 'cli' ? '/docs/installation' : '/docs/installation/manual'}>
      <LinkTabsList>
        <LinkTabsTrigger href="/docs/installation">CLI</LinkTabsTrigger>
        <LinkTabsTrigger href="/docs/installation/manual">Manual</LinkTabsTrigger>
      </LinkTabsList>
      <LinkTabsContent value={value === 'cli' ? '/docs/installation' : '/docs/installation/manual'}>
        {children}
      </LinkTabsContent>
    </LinkTabs>
  );
}

function onRef(value: 'cli' | 'manual') {
  return () => {
    if (value === 'cli') {
      return;
    }
    const link = document.querySelector(
      'a[data-active="false"][href="/docs/installation"]'
    ) as HTMLAnchorElement | null;
    if (!link) {
      return;
    }
    link.classList.add('!bg-primary/10');
    link.classList.add('!text-primary');
    link.classList.add('!font-medium');
    return () => {
      link.classList.remove('!bg-primary/10');
      link.classList.remove('!text-primary');
      link.classList.remove('!font-medium');
    };
  };
}

export { InstallationTabs };
