'use client';

import { RnrIcon } from '@docs/components/icons/rnr-icon';
import { PlatformSelect, usePlatform } from '@docs/components/platform-select';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import * as React from 'react';

type PreviewCardProps = {
  preview: React.ReactNode;
};

export function PreviewCard({ preview }: PreviewCardProps) {
  const { width } = useWindowSize();
  const isDark = useIsDarkMode();
  const params = useParams<{ slug: string[] }>();
  const [platform] = usePlatform();

  const component = params.slug.at(-1);

  return (
    <>
      <div className="group/copy bg-card not-prose relative flex min-h-[450px] flex-col rounded-md border p-4">
        <div className="absolute -top-11 right-0 mt-px hidden items-center justify-end sm:flex">
          <PlatformSelect />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          {platform === 'native' && width >= 640 ? (
            <div className="flex max-w-sm flex-col items-center gap-6 p-4">
              <QRCodeSVG
                value={`https://reactnativereusables.com/showcase/links/${component}`}
                bgColor={isDark ? 'black' : 'white'}
                fgColor={isDark ? 'white' : 'black'}
                size={230}
                level="H"
              />
              <p className="text-center font-mono text-sm">Scan to preview.</p>
            </div>
          ) : (
            preview
          )}
        </div>
      </div>
      <a
        href={`https://reactnativereusables.com/showcase/links/${component}`}
        target="_blank"
        className="not-prose bg-primary text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 mt-4 inline-flex w-full shrink-0 items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium shadow-sm outline-none transition-all focus-visible:ring-[3px] sm:hidden dark:p-2 [&_svg]:shrink-0">
        <div className="bg-primary flex items-center justify-center rounded-lg p-1 shadow-md dark:bg-black dark:p-2">
          <RnrIcon className="size-11 text-white dark:size-10" pathClassName="stroke-1" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="leading-none">Tap to preview in the app</p>
          <p className="text-[1.3rem] font-semibold leading-none">React Native Reusables</p>
        </div>
      </a>
    </>
  );
}

export function BlockPreviewCard({ preview }: PreviewCardProps) {
  return (
    <div className="group/copy bg-card not-prose relative flex min-h-[450px] flex-col rounded-md border">
      <div className="flex flex-1 flex-col items-center justify-center py-6 sm:px-4 sm:py-8">
        {preview}
      </div>
    </div>
  );
}

type WindowSize = {
  width: number;
  height: number;
};

function useWindowSize(): WindowSize {
  const [size, setSize] = React.useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}

export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains('dark')
  );

  React.useEffect(() => {
    const htmlEl = document.documentElement;

    const updateDarkMode = () => {
      setIsDark(htmlEl.classList.contains('dark'));
    };

    updateDarkMode();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateDarkMode();
        }
      }
    });

    observer.observe(htmlEl, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isDark;
}
