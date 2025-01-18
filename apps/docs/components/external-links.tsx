import { ExternalLinkIcon } from 'lucide-react';

type ExternalLinksProps = {
  links: {
    title: string;
    url: string;
  }[];
};

export function ExternalLinks(props: ExternalLinksProps) {
  return (
    <div className='pb-4 flex flex-wrap gap-2'>
      {props.links.map((link) => (
        <a
          key={link.title}
          href={link.url}
          target='_blank'
          className='inline-flex bg-muted border rounded-md no-underline px-2 py-0.5'
        >
          <div className='flex items-center gap-1 text-xs font-medium'>
            {link.title} <ExternalLinkIcon strokeWidth={2.5} className='w-3 h-3' />
          </div>
        </a>
      ))}
    </div>
  );
}
