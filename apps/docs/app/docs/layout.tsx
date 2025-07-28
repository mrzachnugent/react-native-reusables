import { RnrIcon } from '@docs/components/icons/rnr-icon';
import { SkipNavigationButton } from '@docs/components/skip-navigation-button';
import { source } from '@docs/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

const SIDEBAR_PROPS = { className: '[&>div]:pt-3' };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipNavigationButton />
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <div className="text-foreground/80 -ml-px flex items-center gap-1.5 opacity-90 transition-opacity duration-200 hover:opacity-100">
              <div className="flex items-center justify-center">
                <RnrIcon />
              </div>
              <p className="text-base">Reusables</p>
            </div>
          ),
        }}
        sidebar={SIDEBAR_PROPS}
        githubUrl="https://github.com/founded-labs/react-native-reusables">
        {children}
      </DocsLayout>
    </>
  );
}
