import { AppStoreButton } from './app-store-button';
import { PlayStoreButton } from './play-store-button';
import { RnrIcon } from './icons/rnr-icon';
import { cn } from '@docs/lib/utils';

export function DownloadAppBanner({
  title = 'React Native Reusables',
  description = 'Preview components on your phone by scanning QR codes from the docs.',
  size = 'default',
}: {
  title?: string;
  description?: string;
  size?: 'default' | 'sm';
}) {
  return (
    <div className="bg-card not-prose flex flex-col-reverse items-center justify-between gap-6 rounded-xl border p-12 shadow-sm sm:gap-8 lg:flex-row lg:p-14">
      <div
        className={cn(
          'flex max-w-[25.5rem] flex-col items-center justify-center gap-8 lg:items-start',
          size === 'sm' && 'max-w-xs'
        )}>
        <div>
          <h1 className="pb-1 text-center text-3xl font-medium lg:text-left lg:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground text-center text-base lg:text-left">{description}</p>
        </div>
        <div className="flex gap-2 lg:gap-3">
          <AppStoreButton />
          <PlayStoreButton />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="border-border/0 dark:border-border flex items-center justify-center rounded-3xl border bg-black p-4 shadow-md md:rounded-[2.5rem] md:p-6">
          <RnrIcon className="size-16 text-white md:size-32" pathClassName="stroke-1" />
        </div>
      </div>
    </div>
  );
}
