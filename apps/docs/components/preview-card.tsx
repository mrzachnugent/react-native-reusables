'use client';

import { RnrIcon } from '@docs/components/icons/rnr-icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@docs/components/ui/select';
import { type SelectProps } from '@radix-ui/react-select';
import { useReactiveGetCookie, useReactiveSetCookie } from 'cookies-next/client';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import * as React from 'react';

const PLATFORMS = [
  { name: 'web', label: 'Web' },
  { name: 'native', label: 'Native' },
] as const;

const STYLES = [
  { name: 'new-york', label: 'New York' },
  { name: 'default', label: 'Default' },
] as const;

type Platform = (typeof PLATFORMS)[number]['name'];
type Style = (typeof STYLES)[number]['name'];

type PreviewCardProps = {
  webPreview: React.ReactNode;
  webNewYorkPreview?: React.ReactNode;
};

const DEFAULT_STYLE_RADIUS = { '--radius': '0.5rem' } as React.CSSProperties;

export function PreviewCard({ webPreview, webNewYorkPreview }: PreviewCardProps) {
  const { width } = useWindowSize();
  const isDark = useIsDarkMode();
  const params = useParams<{ slug: string[] }>();
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const platform = getCookie('platform') ?? 'web';
  const style = getCookie('style') ?? 'new-york';

  function onPlatformChange(value: Platform) {
    setCookie('platform', value);
  }
  function onStyleChange(value: Style) {
    setCookie('style', value);
  }

  const component = params.slug.at(-1);

  return (
    <>
      <div className="group/copy bg-card not-prose relative flex min-h-[450px] flex-col rounded-md border p-4">
        <div className="flex items-center justify-between">
          {platform === 'web' || width < 640 ? (
            <StyleSwitcher onValueChange={onStyleChange} defaultValue="default" value={style} />
          ) : (
            <div />
          )}
          <PlatformSwitcher onValueChange={onPlatformChange} defaultValue="web" value={platform} />
        </div>
        <div
          style={style === 'default' ? DEFAULT_STYLE_RADIUS : undefined}
          className="flex flex-1 flex-col items-center justify-center py-6">
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
          ) : style === 'default' ? (
            webPreview
          ) : (
            webNewYorkPreview
          )}
        </div>
      </div>
      <a
        href={`https://reactnativereusables.com/showcase/links/${component}`}
        target="_blank"
        className="not-prose bg-primary text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 mt-4 inline-flex w-full shrink-0 items-center gap-3 rounded-xl p-3 text-sm font-medium shadow-sm outline-none transition-all focus-visible:ring-[3px] sm:hidden [&_svg]:shrink-0">
        <div className="dark:border-border/0 border-border/30 flex items-center justify-center rounded-lg border bg-black p-2.5 shadow-md">
          <RnrIcon className="size-8 text-white" pathClassName="stroke-1" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="leading-none">Tap to preview in the app</p>
          <p className="text-xl font-semibold leading-none">React Native Reusables</p>
        </div>
      </a>
    </>
  );
}

export function BlockPreviewCard({ webPreview, webNewYorkPreview }: PreviewCardProps) {
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const style = getCookie('style') ?? 'new-york';

  function onStyleChange(value: Style) {
    setCookie('style', value);
  }

  return (
    <div className="group/copy bg-card not-prose relative flex min-h-[450px] flex-col rounded-md border p-4">
      <StyleSwitcher onValueChange={onStyleChange} defaultValue="default" value={style} />
      <div
        style={style === 'default' ? DEFAULT_STYLE_RADIUS : undefined}
        className="flex flex-1 flex-col items-center justify-center py-6">
        {style === 'default' ? webPreview : webNewYorkPreview}
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
      <SelectTrigger className="hidden h-7 w-fit gap-1 pl-2.5 pr-1.5 text-xs sm:flex [&_svg]:h-4 [&_svg]:w-4">
        <span className="text-muted-foreground flex-1 pr-1">Platform:</span>
        {!isClient ? (
          <span className="opacity-50">
            {
              PLATFORMS.find((platform) =>
                platform.name === props.value ? props.value : props.defaultValue
              )?.label
            }
          </span>
        ) : (
          <SelectValue placeholder="Select platform" />
        )}
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={preventDefault}>
        {PLATFORMS.map((platform) => (
          <SelectItem key={platform.name} value={platform.name} className="text-xs">
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
      <SelectTrigger className="h-7 w-fit gap-1 pl-2.5 pr-1.5 text-xs [&_svg]:h-4 [&_svg]:w-4">
        <span className="text-muted-foreground flex-1 pr-1">Style:</span>
        {!isClient ? (
          <span className="opacity-50">
            {
              STYLES.find((style) =>
                style.name === props.value ? props.value : props.defaultValue
              )?.label
            }
          </span>
        ) : (
          <SelectValue placeholder="Select style" />
        )}
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={preventDefault}>
        {STYLES.map((style) => (
          <SelectItem key={style.name} value={style.name} className="text-xs">
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const INTEGRATIONS = [
  { name: 'none', label: 'None' },
  { name: 'clerk', label: 'Clerk' },
] as const;

type Integration = (typeof INTEGRATIONS)[number]['name'];

function AuthIntegrationSelect(props: SelectProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Select {...props}>
      <SelectTrigger className="flex h-7 w-fit gap-1 pl-2.5 pr-1.5 text-xs [&_svg]:h-4 [&_svg]:w-4">
        <span className="text-muted-foreground flex-1 pr-1">Integration:</span>
        {!isClient ? (
          <span className="opacity-50">
            {
              INTEGRATIONS.find((integration) =>
                integration.name === props.value ? props.value : props.defaultValue
              )?.label
            }
          </span>
        ) : (
          <SelectValue placeholder="Select integration" />
        )}
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={preventDefault}>
        {INTEGRATIONS.map((integration) => (
          <SelectItem key={integration.name} value={integration.name} className="text-xs">
            {integration.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function preventDefault(e: Event) {
  e.preventDefault();
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

function useIsDarkMode(): boolean {
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
