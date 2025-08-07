import { cn } from '@docs/lib/utils';

export function RnrIcon({
  className,
  pathClassName,
  ...props
}: {
  className?: string;
  pathClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-5', className)}
      shapeRendering="geometricPrecision"
      {...props}>
      <path
        d="M15.2858 11.4777L13.0001 13.7131M14.8287 9.01884L10.4858 13.266M13.0001 16.7794C19.6275 16.7794 25 14.4158 25 11.5C25 8.5843 19.6275 6.22068 13.0001 6.22068C6.37276 6.22068 1 8.5843 1 11.5C1 14.4158 6.37276 16.7794 13.0001 16.7794ZM8.3235 14.1397C11.6373 19.751 16.4172 23.1179 18.9999 21.6602C21.5829 20.2022 20.9903 14.4714 17.6765 8.86036C14.3629 3.24884 9.58282 -0.118067 7.00028 1.33992C4.41729 2.79768 5.00994 8.52842 8.3235 14.1397ZM8.3235 8.86036C5.00994 14.4717 4.41751 20.2022 7.00006 21.6602C9.58305 23.1179 14.3629 19.7508 17.6765 14.1397C20.9903 8.52821 21.5829 2.7979 19.0002 1.33992C16.4172 -0.118067 11.6373 3.24907 8.3235 8.86036Z"
        stroke="currentColor"
        strokeLinecap="round"
        className={cn('stroke-[1.2px]', pathClassName)}
      />
    </svg>
  );
}
