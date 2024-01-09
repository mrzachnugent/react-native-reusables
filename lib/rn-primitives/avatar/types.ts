interface AvatarRootProps {
  alt: string;
}

interface AvatarImageProps {
  children?: React.ReactNode;
  onLoadingStatusChange?: (status: 'error' | 'loaded') => void;
}

interface AvatarFallbackProps {}

export type { AvatarRootProps, AvatarImageProps, AvatarFallbackProps };
