import { Badge } from '@docs/components/ui/badge';
import { Button } from '@docs/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function BlocksSection() {
  return (
    <div className="flex w-full">
      <div className="flex w-1/3 flex-1 flex-col items-start gap-2 py-64">
        <Badge
          variant="outline"
          className="bg-card dark:bg-secondary border-border/70 gap-1 pr-2 font-normal shadow-sm">
          <Heart className="size-3" />
          Sponsored by Clerk
        </Badge>
        <h1 className="text-foreground/90 w-full text-2xl font-semibold">Authentication Blocks</h1>
        <Button asChild size="sm">
          <Link href="/docs">Explore all Blocks</Link>
        </Button>
      </div>
      <div className="relative w-2/3 overflow-hidden bg-red-500 [mask-image:radial-gradient(circle_at_center,red,#0000)]">
        <div className="absolute left-1/2 top-1/2 flex w-[90rem] -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center gap-4">
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
          <div className="h-96 w-96 rounded-2xl bg-neutral-900" />
        </div>
      </div>
    </div>
  );
}
