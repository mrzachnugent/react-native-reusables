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
      favicon: '/favicon.png',
      title: 'rnr docs',
      description: 'Documentation for react-native-reusables',
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
        Head: './src/components/Head.astro',
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
              label: 'Initial Setup',
              link: '/getting-started/initial-setup/',
            },
            {
              label: 'Icons',
              link: '/getting-started/icons/',
            },
            {
              label: 'Common patterns',
              link: '/getting-started/common-patterns/',
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
              label: 'Alert',
              link: '/components/alert/',
            },
            {
              label: 'Alert Dialog',
              link: '/components/alert-dialog/',
            },
            {
              label: 'Aspect Ratio',
              link: '/components/aspect-ratio/',
            },
            {
              label: 'Avatar',
              link: '/components/avatar/',
            },
            {
              label: 'Badge',
              link: '/components/badge/',
            },
            {
              label: 'Button',
              link: '/components/button/',
            },
            {
              label: 'Card',
              link: '/components/card/',
            },
            {
              label: 'Checkbox',
              link: '/components/checkbox/',
            },
            {
              label: 'Collapsible',
              link: '/components/collapsible/',
            },
            {
              label: 'Context Menu',
              link: '/components/context-menu/',
            },
            {
              label: 'Dialog',
              link: '/components/dialog/',
            },
            {
              label: 'Dropdown Menu',
              link: '/components/dropdown-menu/',
            },
            {
              label: 'Hover Card',
              link: '/components/hover-card/',
            },
            {
              label: 'Input',
              link: '/components/input/',
            },
            {
              label: 'Label',
              link: '/components/label/',
            },
            {
              label: 'Menubar',
              link: '/components/menubar/',
            },
            {
              label: 'Navigation Menu',
              link: '/components/navigation-menu/',
            },
            {
              label: 'Popover',
              link: '/components/popover/',
            },
            {
              label: 'Progress',
              link: '/components/progress/',
            },
            {
              label: 'Radio Group',
              link: '/components/radio-group/',
            },
            {
              label: 'Select',
              link: '/components/select/',
            },
            {
              label: 'Separator',
              link: '/components/separator/',
            },
            {
              label: 'Skeleton',
              link: '/components/skeleton/',
            },
            {
              label: 'Switch',
              link: '/components/switch/',
            },
            {
              label: 'Table',
              link: '/components/table/',
            },
            {
              label: 'Tabs',
              link: '/components/tabs/',
            },
            {
              label: 'Text',
              link: '/components/text/',
            },
            {
              label: 'Textarea',
              link: '/components/textarea/',
            },
            {
              label: 'Toggle',
              link: '/components/toggle/',
            },
            {
              label: 'Toggle Group',
              link: '/components/toggle-group/',
            },
            {
              label: 'Tooltip',
              link: '/components/tooltip/',
            },
            {
              label: 'Typography',
              link: '/components/typography/',
            },
          ],
        },
        {
          label: 'Extras',
          items: [
            {
              label: 'Android Navigation Bar',
              link: '/extras/android-navigation-bar/',
            },
            {
              label: 'Keyboard',
              link: '/extras/keyboard/',
            },
            {
              label: 'Material Top Tabs',
              link: '/extras/material-top-tabs/',
            },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    react(),
  ],
});
