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
    <DocsPage toc={page.data.toc} full={page.data.full} breadcrumb={{ includePage: false }}>
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
