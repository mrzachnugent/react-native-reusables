import { cn } from '@docs/lib/utils';

export function RnrIcon({
  className,
  strokeWidth = 24,
  reactPathClassName,
  ...props
}: React.ComponentProps<'svg'> & { reactPathClassName?: string }) {
  return (
    <svg
      width='882'
      height='803'
      viewBox='0 0 882 803'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path
        d='M441 591.74C672.958 591.74 860.997 507.15 860.997 402.799C860.997 298.448 672.958 213.858 441 213.858C209.042 213.858 20.9948 298.448 20.9948 402.799C20.9948 507.15 209.042 591.74 441 591.74Z'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        className={cn('opacity-70 dark:opacity-50', reactPathClassName)}
      />
      <path
        d='M277.318 497.27C393.301 698.09 560.598 818.588 650.995 766.416C741.4 714.237 720.657 509.141 604.674 308.328C488.699 107.5 321.395 -12.9976 231.005 39.1817C140.6 91.3531 161.343 296.449 277.318 497.27Z'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        className={cn('opacity-70 dark:opacity-50', reactPathClassName)}
      />
      <path
        d='M277.318 308.328C161.343 509.149 140.608 714.237 230.997 766.416C321.402 818.588 488.699 698.083 604.674 497.27C720.657 296.441 741.4 91.3609 651.003 39.1817C560.598 -12.9976 393.301 107.508 277.318 308.328Z'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        className={cn('opacity-70 dark:opacity-50', reactPathClassName)}
      />
      <g clipPath='url(#clip0_5_26)'>
        <path
          d='M521 402L441 482'
          stroke='currentColor'
          strokeWidth={Number(strokeWidth) * 1.333333333333}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M505 314L353 466'
          stroke='currentColor'
          strokeWidth={Number(strokeWidth) * 1.333333333333}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_5_26'>
          <rect width='256' height='256' fill='white' transform='translate(313 274)' />
        </clipPath>
      </defs>
    </svg>
  );
}
