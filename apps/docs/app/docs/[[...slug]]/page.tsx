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
      breadcrumb={{ includePage: false }}
      tableOfContent={{
        footer: shouldShowTableOfContentFooter(page.data.title) ? <TableOfContentFooter /> : null,
      }}
      footer={{
        component: <Footer url={page.url} />,
      }}
    >
      <DocsBody>
        <div className='flex items-center justify-between gap-2'>
          <DocsTitle className='mb-0 font-semibold'>{page.data.title}</DocsTitle>
          <NeighbourButtons url={page.url} />
        </div>
        <DocsDescription className='mt-2.5 mb-4 text-base'>{page.data.description}</DocsDescription>
        <MDX
          components={{
            ...defaultMdxComponents,
            h2: ({ className, ...props }) => (
              <defaultMdxComponents.h2 className={cn(className, 'font-normal')} {...props} />
            ),
            //  HTML `ref` attribute conflicts with `forwardRef`
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            pre: ({ ref: _ref, className, ...props }) => (
              <CodeBlock
                {...props}
                className={cn(
                  className,
                  'relative bg-fd-foreground/95 dark:bg-fd-secondary/50 text-background dark:text-foreground *:dark'
                )}
              >
                <Pre>{props.children}</Pre>
              </CodeBlock>
            ),
            h3: ({ className, ...props }) => (
              <h3 className={cn(className, 'mt-10 mb-6 font-normal')} {...props} />
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
    <div className='flex items-center gap-2'>
      {neighbours.previous || isManualInstallation ? (
        <Button variant='outline' size='icon' className='size-8 border-border/70' asChild>
          <Link href={neighbours.previous?.url || '/docs'}>
            <ArrowLeftIcon />
          </Link>
        </Button>
      ) : null}
      {neighbours.next || isManualInstallation ? (
        <Button variant='outline' size='icon' className='size-8 border-border/70' asChild>
          <Link href={neighbours.next?.url || '/docs/customization'}>
            <ArrowRightIcon />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

function Footer({ url }: { url: string }) {
  const neighbours = findNeighbour(source.pageTree, url);

  const isManualInstallation = url === '/docs/installation/manual';

  return (
    <footer>
      <div className='flex justify-between h-16 w-full items-center gap-2'>
        {neighbours.previous || isManualInstallation ? (
          <Button
            variant='ghost'
            size='sm'
            asChild
            className='bg-fd-accent hover:bg-fd-accent/80 dark:hover:bg-fd-accent/80'
          >
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
            variant='ghost'
            size='sm'
            asChild
            className='bg-fd-accent hover:bg-fd-accent/80 dark:hover:bg-fd-accent/80'
          >
            <Link href={neighbours.next?.url || '/docs/customization'}>
              {neighbours.next?.name || 'Customization'}
              <ArrowRightIcon />
            </Link>
          </Button>
        ) : null}
      </div>
      <div className='flex h-20 items-center justify-between'>
        <div className='text-fd-muted-foreground w-full text-center text-xs leading-loose lg:text-sm px-4 text-balance'>
          Built by{' '}
          <a
            href='https://x.com/mrzachnugent'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-4'
          >
            mrzachnugent
          </a>{' '}
          at{' '}
          <a
            href='https://foundedlabs.com'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-4 decoration-fd-muted-foreground/0 hover:decoration-fd-muted-foreground'
          >
            Founded Labs
          </a>
          , bringing{' '}
          <a
            href='https://ui.shadcn.com'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-4'
          >
            shadcn/ui
          </a>{' '}
          to React Native. Source on{' '}
          <a
            href='https://github.com/mrzachnugent/react-native-reusables'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-4'
          >
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
    <div className='group bg-card dark:bg-fd-muted border border-border/50 dark:border-border/0 text-fd-foreground/80 relative flex flex-col gap-2 rounded-lg p-6 text-sm mt-12 animate-in fade-in-0 duration-300'>
      <div className='text-base leading-tight font-semibold text-balance group-hover:underline'>
        Want to work with us?
      </div>
      <div className='text-muted-foreground'>Mention us to your team.</div>
      <div className='text-muted-foreground'>
        We help companies like yours ship world-class UI/UX.
      </div>
      <button
        data-slot='button'
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5 mt-2 w-fit"
      >
        Get in touch
      </button>
      <Link href='/docs/hire-us' className='absolute inset-0'>
        <span className='sr-only'>Get in touch</span>
      </Link>
    </div>
  );
}

const PAGE_TITLES_TO_NOT_SHOW_FOOTER = ['Installation', 'Hire us'];

function shouldShowTableOfContentFooter(title: string) {
  return !PAGE_TITLES_TO_NOT_SHOW_FOOTER.includes(title) && Math.random() < 0.5;
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
