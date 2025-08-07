import { fileGenerator } from '@docs/lib/file-generator';
import { remarkDocGen } from 'fumadocs-docgen';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: 'github-dark-default', dark: 'github-dark-default' },
      theme: 'github-dark-default',
    },
    remarkPlugins: [[remarkDocGen, { generators: [fileGenerator()] }]],
  },
});
