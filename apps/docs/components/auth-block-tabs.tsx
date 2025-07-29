'use client';

import { useReactiveGetCookie } from 'cookies-next/client';
import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AuthIntegrationSelect } from './auth-integration-select';

export function AuthBlockTabs({ children }: React.PropsWithChildren) {
  return (
    <Tabs defaultValue="cli">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger id="cli" value="cli">
            CLI
          </TabsTrigger>
          <TabsTrigger id="manual" value="manual">
            Manual
          </TabsTrigger>
        </TabsList>
        <AuthIntegrationSelect />
      </div>
      {children}
    </Tabs>
  );
}
type AuthIntegration = 'none' | 'clerk';

type ContentProps = {
  integration: AuthIntegration;
  children: React.ReactNode;
};

export function AuthBlockTabsCliContent({ children, integration: integrationProp }: ContentProps) {
  const getCookie = useReactiveGetCookie();
  const integration = getCookie('auth-integration') ?? 'none';

  if (integration !== integrationProp) {
    return null;
  }
  return <TabsContent value="cli">{children}</TabsContent>;
}

export function AuthBlockTabsManualContent({
  children,
  integration: integrationProp,
}: ContentProps) {
  const getCookie = useReactiveGetCookie();
  const integration = getCookie('auth-integration') ?? 'none';

  if (integration !== integrationProp) {
    return null;
  }

  return <TabsContent value="manual">{children}</TabsContent>;
}
