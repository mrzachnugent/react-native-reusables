import { AppStoreButton } from '@docs/components/app-store-button';
import { RnrIcon } from '@docs/components/icons/rnr-icon';
import { PlayStoreButton } from '@docs/components/play-store-button';

export default async function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center">
      <div className="bg-card flex w-full max-w-2xl flex-col-reverse items-center justify-between gap-8 rounded-xl border p-12 shadow-sm lg:flex-row lg:gap-12 lg:p-14">
        <div className="flex max-w-xs flex-col items-center justify-center gap-7 lg:items-start">
          <div>
            <h1 className="pb-1 text-center text-3xl font-medium lg:text-balance lg:text-left lg:text-4xl">
              Download the App
            </h1>
            <p className="text-muted-foreground text-center text-base lg:text-left">
              This content is available only through the React Native Reusables app.
            </p>
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
    </main>
  );
}
