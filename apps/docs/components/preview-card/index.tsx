import { cookies } from 'next/headers';
import {
  type PreviewCardClientProps,
  type Platform,
  PreviewCardClient,
} from './preview-card-client';

type PreviewCardProps = Omit<PreviewCardClientProps, 'platformCookie'>;

export function PreviewCard(props: PreviewCardProps) {
  const cookieStore = cookies();
  const platformCookie = cookieStore.get('platform')?.value as Platform;
  return <PreviewCardClient platformCookie={platformCookie} {...props} />;
}
