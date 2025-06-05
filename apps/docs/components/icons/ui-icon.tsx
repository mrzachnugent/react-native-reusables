import { cn } from '@docs/lib/utils';

export function UiIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <rect width='256' height='256' fill='none'></rect>
      <line
        x1='208'
        y1='128'
        x2='128'
        y2='208'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      ></line>
      <line
        x1='192'
        y1='40'
        x2='40'
        y2='192'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      ></line>
    </svg>
  );
}
