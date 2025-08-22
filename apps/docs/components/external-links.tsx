import { ExternalLinkIcon } from 'lucide-react';

type ExternalLinksProps = {
  links: {
    title: string;
    url: string;
  }[];
};

export function ExternalLinks(props: ExternalLinksProps) {
  return (
    <div className="flex flex-wrap gap-2 pb-5">
      {props.links.map((link) => (
        <a
          key={link.title}
          href={link.url}
          target="_blank"
          className="bg-muted hover:bg-muted/50 inline-flex rounded-md border px-2 py-0.5 no-underline">
          <div className="text-foreground/80 flex items-center gap-1 text-xs font-medium">
            {link.title} <ExternalLinkIcon strokeWidth={2.5} className="h-3 w-3" />
          </div>
        </a>
      ))}
    </div>
  );
}
