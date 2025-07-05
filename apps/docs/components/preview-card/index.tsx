import { cookies } from 'next/headers';
import {
  type Platform,
  PreviewCardClient,
  type PreviewCardClientProps,
  type Style,
} from './preview-card-client';

type PreviewCardProps = Omit<PreviewCardClientProps, 'platformCookie'>;

export async function PreviewCard(props: PreviewCardProps) {
  const cookieStore = await cookies();
  const platformCookie = cookieStore.get('platform')?.value as Platform;
  const styleCookie = cookieStore.get('style')?.value as Style;
  return <PreviewCardClient platformCookie={platformCookie} styleCookie={styleCookie} {...props} />;
}
