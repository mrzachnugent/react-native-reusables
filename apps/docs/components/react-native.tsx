import { cn } from '@/lib/utils';
import NextImage, { ImageProps } from 'next/image';

export function View({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col', className)} {...props} />;
}

export function Image({
  fill = true,
  source,
  ...props
}: Omit<ImageProps, 'src'> & { source: { uri: string } }) {
  return <NextImage src={source.uri} fill={fill} {...props} />;
}
