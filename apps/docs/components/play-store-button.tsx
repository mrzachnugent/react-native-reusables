import Image from 'next/image';

export function PlayStoreButton() {
  // TODO: Add link to play store
  return (
    <a href='#' className='relative h-10 sm:h-12 aspect-[16/5] rounded-sm'>
      <Image alt='Get it on Google Play' src={'/google-play-badge.png'} fill />
    </a>
  );
}
