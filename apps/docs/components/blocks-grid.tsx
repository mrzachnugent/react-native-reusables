import { Button } from '@docs/components/ui/button';
import Link from 'next/link';

const BLOCKS = [
  { title: 'Sign in form', href: '/docs/blocks/authentication/sign-in-form' },
  { title: 'Sign up form', href: '/docs/blocks/authentication/sign-up-form' },
  { title: 'Verify email form', href: '/docs/blocks/authentication/verify-email-form' },
  { title: 'Reset password form', href: '/docs/blocks/authentication/reset-password-form' },
  { title: 'Forgot password form', href: '/docs/blocks/authentication/forgot-password-form' },
  { title: 'Social connections', href: '/docs/blocks/authentication/social-connections' },
  { title: 'User menu', href: '/docs/blocks/authentication/user-menu' },
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
