import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Text } from '~/components/ui/text';

export function AspectRatioPreview() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className='h-full w-full justify-center items-center bg-destructive rounded-lg'
    >
      <Text className='text-4xl font-extrabold text-destructive-foreground'>16:9</Text>
    </AspectRatio>
  );
}
