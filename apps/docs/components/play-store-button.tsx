import Image from 'next/image';

export function PlayStoreButton() {
  // TODO(zach): Add link to play store
  return (
    <a href="#" className="relative aspect-[16/5] h-10 rounded-sm sm:h-12">
      <Image alt="Get it on Google Play" src={'/google-play-badge.png'} fill />
    </a>
  );
}
