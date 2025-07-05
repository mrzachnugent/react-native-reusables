import { cookies } from 'next/headers';
import {
  type StyleEitherOrClientProps,
  type Style,
  StyleEitherOrClient,
} from './style-either-or-client';

type StyleEitherOrProps = Omit<StyleEitherOrClientProps, 'styleCookie'>;

export async function StyleEitherOr(props: StyleEitherOrProps) {
  const cookieStore = await cookies();
  const styleCookie = cookieStore.get('style')?.value as Style;
  return <StyleEitherOrClient styleCookie={styleCookie} {...props} />;
}
