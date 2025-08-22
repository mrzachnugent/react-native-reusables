import { DownloadAppBanner } from '@docs/components/download-app-banner';

export default async function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-2">
      <DownloadAppBanner
        size="sm"
        title="Download the App"
        description="This content is available only through the React Native Reusables app."
      />
    </main>
  );
}
