import { cookies } from 'next/headers';
import {
  type PreviewCardClientProps,
  type Platform,
  PreviewCardClient,
} from './preview-card-client';

type PreviewCardProps = Omit<PreviewCardClientProps, 'platformCookie'>;

export async function PreviewCard(props: PreviewCardProps) {
  const cookieStore = await cookies();
  const platformCookie = cookieStore.get('platform')?.value as Platform;
  return <PreviewCardClient platformCookie={platformCookie} {...props} />;
}
