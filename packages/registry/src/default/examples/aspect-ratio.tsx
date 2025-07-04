import { AspectRatio } from '@/registry/default/components/ui/aspect-ratio';
import { Image } from 'react-native';

export function AspectRatioPreview() {
  return (
    <AspectRatio ratio={16 / 9} className='relative aspect-video w-full overflow-hidden rounded-md'>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
        }}
        alt='Photo by Drew Beamer'
        className='absolute top-0 right-0 left-0 bottom-0 object-cover'
      />
    </AspectRatio>
  );
}
