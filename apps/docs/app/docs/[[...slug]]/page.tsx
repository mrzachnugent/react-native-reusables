import { Button } from '@docs/components/ui/button';
import { source } from '@docs/lib/source';
import { cn } from '@docs/lib/utils';
import { findNeighbour } from 'fumadocs-core/server';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
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
      <div className="text-muted-foreground">Mention us to your team.</div>
      <div className="text-muted-foreground">We help companies ship world-class UI/UX.</div>
      <button
        data-slot="button"
        className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 has-[&gt;svg]:px-2.5 mt-2 inline-flex h-8 w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50">
        Learn more
      </button>
      <Link href="/docs/hire-us" className="absolute inset-0">
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
        d="M60.959 10.0586C67.7645 16.608 72 25.809 72 36C72 55.8822 55.8822 72 36 72C29.0893 72 22.6347 70.0505 17.1523 66.6748C22.3873 68.4072 28.3726 66.8204 32.0146 62.2598C32.131 62.1141 32.2498 61.9652 32.3701 61.8145C37.6242 55.2343 35.3325 44.4927 37.3457 36.3164C39.1367 29.0433 46.4846 24.5989 53.7578 26.3896C54.63 26.6044 55.4613 26.8995 56.2461 27.2646C57.7227 27.9517 59.5618 27.7619 60.5781 26.4893C64.4722 21.6122 64.4576 14.8744 60.959 10.0586ZM36 0C42.9823 4.07255e-07 49.4989 1.99012 55.0176 5.43066C49.6089 3.26535 43.2037 4.77614 39.3809 9.56348C39.2647 9.70901 39.1466 9.85727 39.0264 10.0078C33.7721 16.5881 36.0659 27.3294 34.0527 35.5059C32.2619 42.7792 24.914 47.2244 17.6406 45.4336C16.7675 45.2186 15.935 44.9232 15.1494 44.5576C13.6727 43.8704 11.8339 44.0603 10.8174 45.333C7.25637 49.793 6.96447 55.8098 9.61621 60.4893C3.65007 54.0645 5.51757e-07 45.4592 0 36C0 16.1178 16.1178 0 36 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
