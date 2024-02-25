import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapters: [vercel()],
  build: {
    redirects: false,
  },
  redirects: {
    '/': '/getting-started/introduction/',
  },
  integrations: [
    starlight({
      title: 'rnr docs',
      description: 'Documentation for react-native-reusables',
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      social: {
        github: 'https://github.com/mrzachnugent/react-native-reusables',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            {
              label: 'Introduction',
              link: '/getting-started/introduction/',
            },
            {
              label: 'Installation',
              link: '/getting-started/installation/',
            },
          ],
        },
        {
          label: 'Components',
          items: [
            {
              label: 'Accordion',
              link: '/components/accordion/',
            },
            {
              label: 'Dialog',
              link: '/components/dialog/',
            },
          ],
        },
        {
          label: 'Primitives',
          items: [
            {
              label: 'Dialog',
              link: '/primitives/dialog/',
            },
            {
              label: 'Portal',
              link: '/primitives/portal/',
            },
          ],
        },
        {
          label: 'Utilities',
          items: [
            {
              label: 'Android Navigation Bar',
              link: '/utilities/android-navigation-bar/',
            },
            {
              label: 'Keyboard',
              link: '/utilities/keyboard/',
            },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
