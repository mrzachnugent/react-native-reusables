import { cn } from '@/lib/utils';
import NextImage, { ImageProps } from 'next/image';

export function View(props: React.ComponentProps<'div'>) {
  return <div {...props} />;
}

export function Image({
  fill = true,
  source,
  className,
  ...props
}: Omit<ImageProps, 'src'> & { source: { uri: string } }) {
  return <NextImage src={source.uri} fill={fill} className={cn('mt-0', className)} {...props} />;
}
