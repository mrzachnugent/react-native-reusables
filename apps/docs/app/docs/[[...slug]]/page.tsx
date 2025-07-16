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

function getRandomBoolean() {
  return Math.random() < 0.5;
}

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
        footer:
          page.data.title !== 'Hire us' && getRandomBoolean() ? <TableOfContentFooter /> : null,
      }}
    >
      <DocsBody>
        <div className='flex items-center justify-between gap-2'>
          <DocsTitle className='mb-0'>{page.data.title}</DocsTitle>
          <NeighbourButtons url={page.url} />
        </div>
        <DocsDescription className='mt-2.5 mb-4 text-base'>{page.data.description}</DocsDescription>
        <MDX
          components={{
            ...defaultMdxComponents,
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
              <h3 className={cn(className, 'mt-10 mb-6')} {...props} />
            ),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

function NeighbourButtons({ url }: { url: string }) {
  const neighbours = findNeighbour(source.pageTree, url);
  return (
    <div className='flex items-center gap-2'>
      {neighbours.previous && (
        <Button variant='outline' size='icon' className='size-8 border-border/70' asChild>
          <Link href={neighbours.previous.url}>
            <ArrowLeftIcon />
          </Link>
        </Button>
      )}
      {neighbours.next && (
        <Button variant='outline' size='icon' className='size-8 border-border/70' asChild>
          <Link href={neighbours.next.url}>
            <ArrowRightIcon />
          </Link>
        </Button>
      )}
    </div>
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
