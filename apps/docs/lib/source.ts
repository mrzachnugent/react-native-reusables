import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { icons } from 'lucide-react';
import { createElement } from 'react';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});
