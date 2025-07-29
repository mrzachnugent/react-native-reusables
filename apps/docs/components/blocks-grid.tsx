import { Button } from '@docs/components/ui/button';
import Link from 'next/link';

const BLOCKS = [
  { title: 'Sign in', href: '/docs/blocks/authentication/sign-in' },
  { title: 'Sign up', href: '/docs/blocks/authentication/sign-up' },
  { title: 'Forgot password', href: '/docs/blocks/authentication/forgot-password' },
  { title: 'Reset password', href: '/docs/blocks/authentication/reset-password' },
  { title: 'Verify email', href: '/docs/blocks/authentication/verify-email' },
  { title: 'User menu', href: '/docs/blocks/authentication/user-menu' },
  { title: 'Social connections', href: '/docs/blocks/authentication/social-connections' },
];

export function BlocksGrid() {
  return (
    <div className="not-prose sm:gird-cols-3 grid grid-cols-2 gap-4 xl:grid-cols-4">
      {BLOCKS.map((block) => (
        <Button
          asChild
          size="lg"
          variant="link"
          key={block.href}
          className="justify-start px-0 text-base font-normal">
          <Link href={block.href}>{block.title}</Link>
        </Button>
      ))}
    </div>
  );
}
