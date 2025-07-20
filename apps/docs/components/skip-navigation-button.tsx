import { Button } from './ui/button';

export function SkipNavigationButton() {
  return (
    <Button
      asChild
      variant='secondary'
      className='absolute -left-60 top-3.5 mt-px z-50 px-4 py-2 focus:left-4 focus:outline-none transition-none'
      aria-label='Skip navigation'
    >
      <a href='#nd-page'>Skip navigation</a>
    </Button>
  );
}
