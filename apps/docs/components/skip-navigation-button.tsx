import { Button } from './ui/button';

export function SkipNavigationButton() {
  return (
    <Button
      asChild
      variant="secondary"
      className="absolute -left-60 top-3.5 z-50 mt-px px-4 py-2 transition-none focus:left-4 focus:outline-none"
      aria-label="Skip navigation">
      <a href="#nd-page">Skip navigation</a>
    </Button>
  );
}
