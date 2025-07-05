'use client';

import * as React from 'react';

export type Style = 'default' | 'new-york';

export type StyleEitherOrClientProps = {
  styleCookie?: Style;
  defaultCode: React.ReactNode;
  newYorkCode: React.ReactNode;
};

export function StyleEitherOrClient({
  styleCookie,
  defaultCode,
  newYorkCode,
}: StyleEitherOrClientProps) {
  const [style, setStyle] = React.useState<Style>(styleCookie ?? 'default');

  React.useEffect(() => {
    function handleCookieChange(ev: Event) {
      const detail = (ev as Event & { detail: { name: string; value: Style } }).detail;
      if (detail.name === 'style') {
        setStyle(detail.value);
      }
    }

    window.addEventListener('cookieChange', handleCookieChange);
    return () => {
      window.removeEventListener('cookieChange', handleCookieChange);
    };
  }, []);

  return style === 'new-york' ? newYorkCode : defaultCode;
}
