import { Badge } from '@docs/components/ui/badge';
import { Button } from '@docs/components/ui/button';
import { BatteryCharging } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesSection() {
  return (
    <div className="flex w-full">
      <div className="flex w-1/3 flex-1 flex-col items-start gap-2 py-64">
        <Badge
          variant="outline"
          className="bg-card dark:bg-secondary border-border/70 gap-1 pr-2 font-normal shadow-sm">
          <BatteryCharging className="size-3" />
          Batteries Included!
        </Badge>
        <h1 className="text-foreground/90 w-full text-2xl font-semibold">
          Authentication Template
        </h1>
        <p className="text-foreground/80 max-w-3xl text-balance text-base sm:text-lg">
          A complete authentication solution for your app, including sign-up, sign-in, and user
          management. Powered by Clerk, this template provides a seamless user experience with
          pre-built components and flows.
        </p>
        <Button asChild size="sm">
          <Link href="/docs">Add it to your app</Link>
        </Button>
      </div>
      <div className="relative w-2/3 overflow-hidden bg-red-500"></div>
    </div>
  );
}
