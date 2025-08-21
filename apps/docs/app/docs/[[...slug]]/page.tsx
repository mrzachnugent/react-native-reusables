import { Button } from '@docs/components/ui/button';
import { source } from '@docs/lib/source';
import { cn } from '@docs/lib/utils';
import { findNeighbour } from 'fumadocs-core/server';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { ArrowLeftIcon, ArrowRightIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      tableOfContent={{
        footer: shouldShowTableOfContentFooter(page.data.title) ? <TableOfContentFooter /> : null,
      }}
      footer={{
        component: <Footer url={page.url} />,
      }}>
      <DocsBody>
        <div className="flex items-center justify-between gap-2">
          <DocsTitle className="mb-0 font-semibold">{page.data.title}</DocsTitle>
          <NeighbourButtons url={page.url} />
        </div>
        <DocsDescription className="mb-4 mt-2.5 text-base">{page.data.description}</DocsDescription>
        <MDX
          components={{
            ...defaultMdxComponents,
            h2: ({ className, ...props }) => (
              <defaultMdxComponents.h2 className={cn(className, 'font-medium')} {...props} />
            ),
            //  HTML `ref` attribute conflicts with `forwardRef`
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            pre: ({ ref: _ref, className, ...props }) => (
              <CodeBlock
                {...props}
                className={cn(
                  className,
                  'bg-fd-foreground/95 dark:bg-fd-secondary/50 text-background dark:text-foreground *:dark relative'
                )}>
                <Pre>{props.children}</Pre>
              </CodeBlock>
            ),
            h3: ({ className, ...props }) => (
              <h3 className={cn(className, 'mb-6 mt-10 scroll-mt-20 font-medium')} {...props} />
            ),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

function NeighbourButtons({ url }: { url: string }) {
  const neighbours = findNeighbour(source.pageTree, url);

  const isManualInstallation = url === '/docs/installation/manual';

  return (
    <div className="flex items-center gap-2">
      {neighbours.previous || isManualInstallation ? (
        <Button variant="outline" size="icon" className="border-border/70 size-8" asChild>
          <Link href={neighbours.previous?.url || '/docs'}>
            <ArrowLeftIcon />
          </Link>
        </Button>
      ) : null}
      {neighbours.next || isManualInstallation ? (
        <Button variant="outline" size="icon" className="border-border/70 size-8" asChild>
          <Link href={neighbours.next?.url || '/docs/customization'}>
            <ArrowRightIcon />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export function Footer({ url }: { url: string }) {
  const neighbours = findNeighbour(source.pageTree, url);

  const isManualInstallation = url === '/docs/installation/manual';

  return (
    <footer>
      <div className="flex h-16 w-full items-center justify-between gap-2">
        {neighbours.previous || isManualInstallation ? (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="bg-fd-accent hover:bg-fd-accent/80 dark:hover:bg-fd-accent/80">
            <Link href={neighbours.previous?.url || '/docs'}>
              <ArrowLeftIcon />
              {neighbours.previous?.name || 'Introduction'}
            </Link>
          </Button>
        ) : (
          <div />
        )}
        {neighbours.next || isManualInstallation ? (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="bg-fd-accent hover:bg-fd-accent/80 dark:hover:bg-fd-accent/80">
            <Link href={neighbours.next?.url || '/docs/customization'}>
              {neighbours.next?.name || 'Customization'}
              <ArrowRightIcon />
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="flex h-20 items-center justify-between">
        <div className="text-fd-muted-foreground w-full text-balance px-4 text-center text-xs leading-loose lg:text-sm">
          Built by{' '}
          <a
            href="https://x.com/mrzachnugent"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4">
            mrzachnugent
          </a>{' '}
          at{' '}
          <a
            href="https://foundedlabs.com"
            target="_blank"
            rel="noreferrer"
            className="decoration-fd-muted-foreground/0 hover:decoration-fd-muted-foreground underline underline-offset-4">
            Founded Labs
          </a>
          , bringing{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4">
            shadcn/ui
          </a>{' '}
          to React Native. Source on{' '}
          <a
            href="https://github.com/founded-labs/react-native-reusables"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4">
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  );
}

function TableOfContentFooter() {
  return (
    <div className="bg-card dark:bg-fd-muted border-border/50 dark:border-border/0 text-fd-foreground/80 group relative mt-12 flex flex-col gap-2 overflow-clip rounded-lg border p-6 text-sm">
      <div className="bg-fd-foreground/10 dark:bg-fd-foreground/20 border-fd-foreground absolute left-8 top-8 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed [mask-image:radial-gradient(circle_at_center,red,transparent)]" />
      <FoundedLabsLogo className="mb-4 size-12" />
      <div className="text-balance text-base font-semibold leading-tight group-hover:underline">
        Want to work with us?
      </div>
      <div className="">Mention us to your team.</div>
      <div className="text-muted-foreground pb-2">We help companies ship world-class UI/UX.</div>
      <Button
        size="sm"
        className="from-primary to-primary/75 group-hover:to-primary/80 relative w-fit bg-transparent bg-gradient-to-br duration-300 group-hover:pr-8">
        Learn more
        <ChevronRight className="absolute right-2 top-1/2 -translate-x-1 -translate-y-1/2 scale-y-0 opacity-0 duration-300 group-hover:translate-x-0 group-hover:scale-y-100 group-hover:opacity-100" />
      </Button>
      <Link href="https://foundedlabs.com" target="_blank" className="absolute inset-0">
        <span className="sr-only">Learn more about Founded Labs</span>
      </Link>
    </div>
  );
}

const PAGE_TITLES_TO_NOT_SHOW_FOOTER = ['Installation', 'Hire us'];

function shouldShowTableOfContentFooter(title: string) {
  return !PAGE_TITLES_TO_NOT_SHOW_FOOTER.includes(title);
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

function FoundedLabsLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M68.9864 21.5847C72.7676 30.2399 73.1596 40.3614 69.2597 49.7766C61.6511 68.1454 40.5922 76.8683 22.2234 69.2597C15.8387 66.6151 10.6215 62.3439 6.84829 57.1271C11.0218 60.731 17.1587 61.5555 22.2688 58.7357C22.4321 58.6457 22.5988 58.5535 22.7677 58.4604C30.1399 54.3917 32.1333 43.5908 37.1222 36.8073C41.5602 30.7732 50.0495 29.4791 56.0838 33.9168C56.8074 34.449 57.4625 35.0398 58.0478 35.6774C59.1491 36.8773 60.9209 37.4057 62.3468 36.6189C67.8108 33.6033 70.3758 27.3727 68.9864 21.5847ZM49.7766 2.74035C56.2274 5.41236 61.4863 9.74477 65.2683 15.0353C61.1 10.965 54.6042 9.90967 49.2403 12.8696C49.0773 12.9596 48.9114 13.0514 48.7428 13.1445C41.3703 17.2132 39.379 28.0146 34.3901 34.7983C29.9521 40.8327 21.4625 42.1276 15.4281 37.6897C14.7037 37.157 14.0475 36.5654 13.4617 35.927C12.3604 34.727 10.5888 34.1988 9.1627 34.9856C4.16601 37.7433 1.59379 43.1904 2.25292 48.5285C-0.800437 40.3097 -0.879535 30.9625 2.74033 22.2234C10.3489 3.8546 31.4078 -4.86826 49.7766 2.74035Z"
        fill="currentColor"
      />
    </svg>
  );
}
