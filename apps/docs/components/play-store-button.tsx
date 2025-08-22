import Image from 'next/image';

export function PlayStoreButton() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.reactnativereusables.android"
      target="_blank"
      className="relative aspect-[16/5] h-10 rounded-sm sm:h-12">
      <Image alt="Get it on Google Play" src={'/google-play-badge.png'} fill />
    </a>
  );
}
