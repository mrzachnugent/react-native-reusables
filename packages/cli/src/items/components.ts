export const UI_COMPONENTS = [
  {
    name: 'accordion',
    dependencies: ['accordion-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/accordion.tsx',
        to: {
          folder: 'ui',
          file: 'accordion.tsx',
        },
      },
    ],
  },
  {
    name: 'alert-dialog',
    dependencies: ['alert-dialog-primitive', 'button', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/alert-dialog.tsx',
        to: {
          folder: 'ui',
          file: 'alert-dialog.tsx',
        },
      },
    ],
  },
  {
    name: 'aspect-ratio',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/aspect-ratio.tsx',
        to: {
          folder: 'ui',
          file: 'aspect-ratio.tsx',
        },
      },
    ],
  },
  {
    name: 'avatar',
    dependencies: ['avatar-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/avatar.tsx',
        to: {
          folder: 'ui',
          file: 'avatar.tsx',
        },
      },
    ],
  },
  {
    name: 'badge',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/badge.tsx',
        to: {
          folder: 'ui',
          file: 'badge.tsx',
        },
      },
    ],
  },
  {
    name: 'button',
    dependencies: ['text', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/button.tsx',
        to: {
          folder: 'ui',
          file: 'button.tsx',
        },
      },
    ],
  },
  {
    name: 'card',
    dependencies: ['text', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/card.tsx',
        to: {
          folder: 'ui',
          file: 'card.tsx',
        },
      },
    ],
  },
  {
    name: 'checkbox',
    dependencies: ['checkbox-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/checkbox.tsx',
        to: {
          folder: 'ui',
          file: 'checkbox.tsx',
        },
      },
    ],
  },
  {
    name: 'collapsible',
    dependencies: ['collapsible-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/collapsible.tsx',
        to: {
          folder: 'ui',
          file: 'collapsible.tsx',
        },
      },
    ],
  },
  {
    name: 'context-menu',
    dependencies: ['context-menu-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/context-menu.tsx',
        to: {
          folder: 'ui',
          file: 'context-menu.tsx',
        },
      },
    ],
  },
  {
    name: 'dialog',
    dependencies: ['dialog-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/dialog.tsx',
        to: {
          folder: 'ui',
          file: 'dialog.tsx',
        },
      },
    ],
  },
  {
    name: 'dropdown-menu',
    dependencies: ['dropdown-menu-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/dropdown-menu.tsx',
        to: {
          folder: 'ui',
          file: 'dropdown-menu.tsx',
        },
      },
    ],
  },
  {
    name: 'hover-card',
    dependencies: ['hover-card-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/hover-card.tsx',
        to: {
          folder: 'ui',
          file: 'hover-card.tsx',
        },
      },
    ],
  },
  {
    name: 'input',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/input.tsx',
        to: {
          folder: 'ui',
          file: 'input.tsx',
        },
      },
    ],
  },
  {
    name: 'label',
    dependencies: ['label-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/label.tsx',
        to: {
          folder: 'ui',
          file: 'label.tsx',
        },
      },
    ],
  },
  {
    name: 'menubar',
    dependencies: ['menubar-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/menubar.tsx',
        to: {
          folder: 'ui',
          file: 'menubar.tsx',
        },
      },
    ],
  },
  {
    name: 'navigation-menu',
    dependencies: ['navigation-menu-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/navigation-menu.tsx',
        to: {
          folder: 'ui',
          file: 'navigation-menu.tsx',
        },
      },
    ],
  },
  {
    name: 'popover',
    dependencies: ['popover-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/popover.tsx',
        to: {
          folder: 'ui',
          file: 'popover.tsx',
        },
      },
    ],
  },
  {
    name: 'radio-group',
    dependencies: ['radio-group-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/radio-group.tsx',
        to: {
          folder: 'ui',
          file: 'radio-group.tsx',
        },
      },
    ],
  },
  {
    name: 'select',
    dependencies: ['select-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/select.tsx',
        to: {
          folder: 'ui',
          file: 'select.tsx',
        },
      },
    ],
  },
  {
    name: 'separator',
    dependencies: ['separator-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/separator.tsx',
        to: {
          folder: 'ui',
          file: 'separator.tsx',
        },
      },
    ],
  },
  {
    name: 'skeleton',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/skeleton.tsx',
        to: {
          folder: 'ui',
          file: 'skeleton.tsx',
        },
      },
    ],
  },
  {
    name: 'switch',
    dependencies: ['switch-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/switch.tsx',
        to: {
          folder: 'ui',
          file: 'switch.tsx',
        },
      },
    ],
  },
  {
    name: 'table',
    dependencies: ['table-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/table.tsx',
        to: {
          folder: 'ui',
          file: 'table.tsx',
        },
      },
    ],
  },
  {
    name: 'tabs',
    dependencies: ['tabs-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/tabs.tsx',
        to: {
          folder: 'ui',
          file: 'tabs.tsx',
        },
      },
    ],
  },
  {
    name: 'text',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/text.tsx',
        to: { folder: 'ui', file: 'text.tsx' },
      },
    ],
  },
  {
    name: 'textarea',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/textarea.tsx',
        to: { folder: 'ui', file: 'textarea.tsx' },
      },
    ],
  },
  {
    name: 'toggle',
    dependencies: ['toggle-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/toggle.tsx',
        to: { folder: 'ui', file: 'toggle.tsx' },
      },
    ],
  },
  {
    name: 'toggle-group',
    dependencies: ['toggle-group-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/toggle-group.tsx',
        to: { folder: 'ui', file: 'toggle-group.tsx' },
      },
    ],
  },
  {
    name: 'tooltip',
    dependencies: ['tooltip-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/tooltip.tsx',
        to: { folder: 'ui', file: 'tooltip.tsx' },
      },
    ],
  },
  {
    name: 'typography',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/typography.tsx',
        to: { folder: 'ui', file: 'typography.tsx' },
      },
    ],
  },
];

const PRIMITIVE_COMPONENTS = [
  {
    name: 'accordion-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-accordion'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/accordion/src/index.ts',
          to: { folder: 'primitives/accordion', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/accordion/src/accordion.web.tsx',
          to: { folder: 'primitives/accordion', file: 'accordion.web.tsx' },
        },
        {
          from: './node_modules/@rnr/accordion/src/accordion.tsx',
          to: { folder: 'primitives/accordion', file: 'accordion.tsx' },
        },
        {
          from: './node_modules/@rnr/accordion/src/types.ts',
          to: { folder: 'primitives/accordion', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/accordion/src/accordion.tsx',
          distFrom: 'primitives/accordion/accordion.tsx',
          to: { folder: 'primitives/accordion', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/accordion/src/types.ts',
          distFrom: 'primitives/accordion/types.ts',
          to: { folder: 'primitives/accordion', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'alert-dialog-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive', 'portal-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-alert-dialog'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/alert-dialog/src/index.ts',
          to: { folder: 'primitives/alert-dialog', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/alert-dialog/src/alert-dialog.web.tsx',
          to: { folder: 'primitives/alert-dialog', file: 'alert-dialog.web.tsx' },
        },
        {
          from: './node_modules/@rnr/alert-dialog/src/alert-dialog.tsx',
          to: { folder: 'primitives/alert-dialog', file: 'alert-dialog.tsx' },
        },
        {
          from: './node_modules/@rnr/alert-dialog/src/types.ts',
          to: { folder: 'primitives/alert-dialog', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/alert-dialog/src/alert-dialog.tsx',
          distFrom: 'primitives/alert-dialog/alert-dialog.tsx',
          to: { folder: 'primitives/alert-dialog', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/alert-dialog/src/types.ts',
          distFrom: 'primitives/alert-dialog/types.ts',
          to: { folder: 'primitives/alert-dialog', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'aspect-ratio-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/aspect-ratio/src/aspect-ratio.tsx',
        to: { folder: 'primitives', file: 'aspect-ratio.tsx' },
      },
    ],
  },
  {
    name: 'avatar-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/avatar/src/avatar.tsx',
        to: { folder: 'primitives/avatar', file: 'index.tsx' },
      },
      {
        from: './node_modules/@rnr/avatar/src/types.ts',
        to: { folder: 'primitives/avatar', file: ' types.ts' },
      },
    ],
  },
  {
    name: 'checkbox-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-checkbox'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/checkbox/src/index.ts',
          to: { folder: 'primitives/checkbox', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/checkbox/src/checkbox.web.tsx',
          to: { folder: 'primitives/checkbox', file: 'checkbox.web.tsx' },
        },
        {
          from: './node_modules/@rnr/checkbox/src/checkbox.tsx',
          to: { folder: 'primitives/checkbox', file: 'checkbox.tsx' },
        },
        {
          from: './node_modules/@rnr/checkbox/src/types.ts',
          to: { folder: 'primitives/checkbox', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/checkbox/src/checkbox.tsx',
          distFrom: 'primitives/checkbox/checkbox.tsx',
          to: { folder: 'primitives/checkbox', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/checkbox/src/types.ts',
          distFrom: 'primitives/checkbox/types.ts',
          to: { folder: 'primitives/checkbox', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'collapsible-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-collapsible'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/collapsible/src/index.ts',
          to: { folder: 'primitives/collapsible', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/collapsible/src/collapsible.web.tsx',
          to: { folder: 'primitives/collapsible', file: 'collapsible.web.tsx' },
        },
        {
          from: './node_modules/@rnr/collapsible/src/collapsible.tsx',
          to: { folder: 'primitives/collapsible', file: 'collapsible.tsx' },
        },
        {
          from: './node_modules/@rnr/collapsible/src/types.ts',
          to: { folder: 'primitives/collapsible', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/collapsible/src/collapsible.tsx',
          distFrom: 'primitives/collapsible/collapsible.tsx',
          to: { folder: 'primitives/collapsible', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/collapsible/src/types.ts',
          distFrom: 'primitives/collapsible/types.ts',
          to: { folder: 'primitives/collapsible', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'context-menu-primitive',
    dependencies: [
      'hooks-primitive',
      'slot-primitive',
      'types-primitive',
      'portal-primitive',
      'utils-primitive',
    ],
    npmPackages: {
      universal: ['@radix-ui/react-context-menu'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/context-menu/src/index.ts',
          to: { folder: 'primitives/context-menu', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/context-menu/src/context-menu.web.tsx',
          to: { folder: 'primitives/context-menu', file: 'context-menu.web.tsx' },
        },
        {
          from: './node_modules/@rnr/context-menu/src/context-menu.tsx',
          to: { folder: 'primitives/context-menu', file: 'context-menu.tsx' },
        },
        {
          from: './node_modules/@rnr/context-menu/src/types.ts',
          to: { folder: 'primitives/context-menu', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/context-menu/src/context-menu.tsx',
          distFrom: 'primitives/context-menu/context-menu.tsx',
          to: { folder: 'primitives/context-menu', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/context-menu/src/types.ts',
          distFrom: 'primitives/context-menu/types.ts',
          to: { folder: 'primitives/context-menu', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'dialog-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive', 'portal-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-dialog'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/dialog/src/index.ts',
          to: { folder: 'primitives/dialog', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/dialog/src/dialog.web.tsx',
          to: { folder: 'primitives/dialog', file: 'dialog.web.tsx' },
        },
        {
          from: './node_modules/@rnr/dialog/src/dialog.tsx',
          to: { folder: 'primitives/dialog', file: 'dialog.tsx' },
        },
        {
          from: './node_modules/@rnr/dialog/src/types.ts',
          to: { folder: 'primitives/dialog', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/dialog/src/dialog.tsx',
          distFrom: 'primitives/dialog/dialog.tsx',
          to: { folder: 'primitives/dialog', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/dialog/src/types.ts',
          distFrom: 'primitives/dialog/types.ts',
          to: { folder: 'primitives/dialog', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'dropdown-menu-primitive',
    dependencies: [
      'hooks-primitive',
      'slot-primitive',
      'types-primitive',
      'portal-primitive',
      'utils-primitive',
    ],
    npmPackages: {
      universal: ['@radix-ui/react-dropdown-menu'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/dropdown-menu/src/index.ts',
          to: { folder: 'primitives/dropdown-menu', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/dropdown-menu/src/dropdown-menu.web.tsx',
          to: { folder: 'primitives/dropdown-menu', file: 'dropdown-menu.web.tsx' },
        },
        {
          from: './node_modules/@rnr/dropdown-menu/src/dropdown-menu.tsx',
          to: { folder: 'primitives/dropdown-menu', file: 'dropdown-menu.tsx' },
        },
        {
          from: './node_modules/@rnr/dropdown-menu/src/types.ts',
          to: { folder: 'primitives/dropdown-menu', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/dropdown-menu/src/dropdown-menu.tsx',
          distFrom: 'primitives/dropdown-menu/dropdown-menu.tsx',
          to: { folder: 'primitives/dropdown-menu', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/dropdown-menu/src/types.ts',
          distFrom: 'primitives/dropdown-menu/types.ts',
          to: { folder: 'primitives/dropdown-menu', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'hover-card-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive', 'portal-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-hover-card'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/hover-card/src/index.ts',
          to: { folder: 'primitives/hover-card', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/hover-card/src/hover-card.web.tsx',
          to: { folder: 'primitives/hover-card', file: 'hover-card.web.tsx' },
        },
        {
          from: './node_modules/@rnr/hover-card/src/hover-card.tsx',
          to: { folder: 'primitives/hover-card', file: 'hover-card.tsx' },
        },
        {
          from: './node_modules/@rnr/hover-card/src/types.ts',
          to: { folder: 'primitives/hover-card', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/hover-card/src/hover-card.tsx',
          distFrom: 'primitives/hover-card/hover-card.tsx',
          to: { folder: 'primitives/hover-card', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/hover-card/src/types.ts',
          distFrom: 'primitives/hover-card/types.ts',
          to: { folder: 'primitives/hover-card', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'label-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-label'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/label/src/index.ts',
          to: { folder: 'primitives/label', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/label/src/label.web.tsx',
          to: { folder: 'primitives/label', file: 'label.web.tsx' },
        },
        {
          from: './node_modules/@rnr/label/src/label.tsx',
          to: { folder: 'primitives/label', file: 'label.tsx' },
        },
        {
          from: './node_modules/@rnr/label/src/types.ts',
          to: { folder: 'primitives/label', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/label/src/label.tsx',
          distFrom: 'primitives/label/label.tsx',
          to: { folder: 'primitives/label', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/label/src/types.ts',
          distFrom: 'primitives/label/types.ts',
          to: { folder: 'primitives/label', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'menubar-primitive',
    dependencies: [
      'hooks-primitive',
      'slot-primitive',
      'types-primitive',
      'portal-primitive',
      'utils-primitive',
    ],
    npmPackages: {
      universal: ['@radix-ui/react-menubar'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/menubar/src/index.ts',
          to: { folder: 'primitives/menubar', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/menubar/src/menubar.web.tsx',
          to: { folder: 'primitives/menubar', file: 'menubar.web.tsx' },
        },
        {
          from: './node_modules/@rnr/menubar/src/menubar.tsx',
          to: { folder: 'primitives/menubar', file: 'menubar.tsx' },
        },
        {
          from: './node_modules/@rnr/menubar/src/types.ts',
          to: { folder: 'primitives/menubar', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/menubar/src/menubar.tsx',
          distFrom: 'primitives/menubar/menubar.tsx',
          to: { folder: 'primitives/menubar', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/menubar/src/types.ts',
          distFrom: 'primitives/menubar/types.ts',
          to: { folder: 'primitives/menubar', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'navigation-menu-primitive',
    dependencies: [
      'hooks-primitive',
      'slot-primitive',
      'types-primitive',
      'portal-primitive',
      'utils-primitive',
    ],
    npmPackages: {
      universal: ['@radix-ui/react-navigation-menu'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/navigation-menu/src/index.ts',
          to: { folder: 'primitives/navigation-menu', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/navigation-menu/src/navigation-menu.web.tsx',
          to: { folder: 'primitives/navigation-menu', file: 'navigation-menu.web.tsx' },
        },
        {
          from: './node_modules/@rnr/navigation-menu/src/navigation-menu.tsx',
          to: { folder: 'primitives/navigation-menu', file: 'navigation-menu.tsx' },
        },
        {
          from: './node_modules/@rnr/navigation-menu/src/types.ts',
          to: { folder: 'primitives/navigation-menu', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/navigation-menu/src/navigation-menu.tsx',
          distFrom: 'primitives/navigation-menu/navigation-menu.tsx',
          to: { folder: 'primitives/navigation-menu', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/navigation-menu/src/types.ts',
          distFrom: 'primitives/navigation-menu/types.ts',
          to: { folder: 'primitives/navigation-menu', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'popover-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive', 'portal-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-popover'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/popover/src/index.ts',
          to: { folder: 'primitives/popover', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/popover/src/popover.web.tsx',
          to: { folder: 'primitives/popover', file: 'popover.web.tsx' },
        },
        {
          from: './node_modules/@rnr/popover/src/popover.tsx',
          to: { folder: 'primitives/popover', file: 'popover.tsx' },
        },
        {
          from: './node_modules/@rnr/popover/src/types.ts',
          to: { folder: 'primitives/popover', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/popover/src/popover.tsx',
          distFrom: 'primitives/popover/popover.tsx',
          to: { folder: 'primitives/popover', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/popover/src/types.ts',
          distFrom: 'primitives/popover/types.ts',
          to: { folder: 'primitives/popover', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'progress-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-progress'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/progress/src/index.ts',
          to: { folder: 'primitives/progress', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/progress/src/progress.web.tsx',
          to: { folder: 'primitives/progress', file: 'progress.web.tsx' },
        },
        {
          from: './node_modules/@rnr/progress/src/progress.tsx',
          to: { folder: 'primitives/progress', file: 'progress.tsx' },
        },
        {
          from: './node_modules/@rnr/progress/src/types.ts',
          to: { folder: 'primitives/progress', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/progress/src/progress.tsx',
          distFrom: 'primitives/progress/progress.tsx',
          to: { folder: 'primitives/progress', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/progress/src/types.ts',
          distFrom: 'primitives/progress/types.ts',
          to: { folder: 'primitives/progress', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'radio-group-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-radio-group'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/radio-group/src/index.ts',
          to: { folder: 'primitives/radio-group', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/radio-group/src/radio-group.web.tsx',
          to: { folder: 'primitives/radio-group', file: 'radio-group.web.tsx' },
        },
        {
          from: './node_modules/@rnr/radio-group/src/radio-group.tsx',
          to: { folder: 'primitives/radio-group', file: 'radio-group.tsx' },
        },
        {
          from: './node_modules/@rnr/radio-group/src/types.ts',
          to: { folder: 'primitives/radio-group', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/radio-group/src/radio-group.tsx',
          distFrom: 'primitives/radio-group/radio-group.tsx',
          to: { folder: 'primitives/radio-group', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/radio-group/src/types.ts',
          distFrom: 'primitives/radio-group/types.ts',
          to: { folder: 'primitives/radio-group', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'select-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive', 'portal-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-select'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/select/src/index.ts',
          to: { folder: 'primitives/select', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/select/src/select.web.tsx',
          to: { folder: 'primitives/select', file: 'select.web.tsx' },
        },
        {
          from: './node_modules/@rnr/select/src/select.tsx',
          to: { folder: 'primitives/select', file: 'select.tsx' },
        },
        {
          from: './node_modules/@rnr/select/src/types.ts',
          to: { folder: 'primitives/select', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/select/src/select.tsx',
          distFrom: 'primitives/select/select.tsx',
          to: { folder: 'primitives/select', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/select/src/types.ts',
          distFrom: 'primitives/select/types.ts',
          to: { folder: 'primitives/select', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'separator-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/separator/src/separator.tsx',
        to: { folder: 'primitives/separator', file: 'index.tsx' },
      },
      {
        from: './node_modules/@rnr/separator/src/types.ts',
        to: { folder: 'primitives/separator', file: ' types.ts' },
      },
    ],
  },
  {
    name: 'slider-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-slider'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/slider/src/index.ts',
          to: { folder: 'primitives/slider', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/slider/src/slider.web.tsx',
          to: { folder: 'primitives/slider', file: 'slider.web.tsx' },
        },
        {
          from: './node_modules/@rnr/slider/src/slider.tsx',
          to: { folder: 'primitives/slider', file: 'slider.tsx' },
        },
        {
          from: './node_modules/@rnr/slider/src/types.ts',
          to: { folder: 'primitives/slider', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/slider/src/slider.tsx',
          distFrom: 'primitives/slider/slider.tsx',
          to: { folder: 'primitives/slider', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/slider/src/types.ts',
          distFrom: 'primitives/slider/types.ts',
          to: { folder: 'primitives/slider', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'switch-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-switch'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/switch/src/index.ts',
          to: { folder: 'primitives/switch', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/switch/src/switch.web.tsx',
          to: { folder: 'primitives/switch', file: 'switch.web.tsx' },
        },
        {
          from: './node_modules/@rnr/switch/src/switch.tsx',
          to: { folder: 'primitives/switch', file: 'switch.tsx' },
        },
        {
          from: './node_modules/@rnr/switch/src/types.ts',
          to: { folder: 'primitives/switch', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/switch/src/switch.tsx',
          distFrom: 'primitives/switch/switch.tsx',
          to: { folder: 'primitives/switch', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/switch/src/types.ts',
          distFrom: 'primitives/switch/types.ts',
          to: { folder: 'primitives/switch', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'table-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/table/src/table.tsx',
        to: { folder: 'primitives', file: 'table.tsx' },
      },
    ],
  },
  {
    name: 'tabs-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-tabs'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/tabs/src/index.ts',
          to: { folder: 'primitives/tabs', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/tabs/src/tabs.web.tsx',
          to: { folder: 'primitives/tabs', file: 'tabs.web.tsx' },
        },
        {
          from: './node_modules/@rnr/tabs/src/tabs.tsx',
          to: { folder: 'primitives/tabs', file: 'tabs.tsx' },
        },
        {
          from: './node_modules/@rnr/tabs/src/types.ts',
          to: { folder: 'primitives/tabs', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/tabs/src/tabs.tsx',
          distFrom: 'primitives/tabs/tabs.tsx',
          to: { folder: 'primitives/tabs', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/tabs/src/types.ts',
          distFrom: 'primitives/tabs/types.ts',
          to: { folder: 'primitives/tabs', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'toast-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/toast/src/toast.tsx',
        to: { folder: 'primitives/toast', file: 'index.tsx' },
      },
      {
        from: './node_modules/@rnr/toast/src/types.ts',
        to: { folder: 'primitives/toast', file: ' types.ts' },
      },
    ],
  },
  {
    name: 'toggle-primitive',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-toggle'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/toggle/src/index.ts',
          to: { folder: 'primitives/toggle', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/toggle/src/toggle.web.tsx',
          to: { folder: 'primitives/toggle', file: 'toggle.web.tsx' },
        },
        {
          from: './node_modules/@rnr/toggle/src/toggle.tsx',
          to: { folder: 'primitives/toggle', file: 'toggle.tsx' },
        },
        {
          from: './node_modules/@rnr/toggle/src/types.ts',
          to: { folder: 'primitives/toggle', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/toggle/src/toggle.tsx',
          distFrom: 'primitives/toggle/toggle.tsx',
          to: { folder: 'primitives/toggle', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/toggle/src/types.ts',
          distFrom: 'primitives/toggle/types.ts',
          to: { folder: 'primitives/toggle', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'toggle-group-primitive',
    dependencies: ['slot-primitive', 'types-primitive', 'utils-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-toggle-group'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/toggle-group/src/index.ts',
          to: { folder: 'primitives/toggle-group', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/toggle-group/src/toggle-group.web.tsx',
          to: { folder: 'primitives/toggle-group', file: 'toggle-group.web.tsx' },
        },
        {
          from: './node_modules/@rnr/toggle-group/src/toggle-group.tsx',
          to: { folder: 'primitives/toggle-group', file: 'toggle-group.tsx' },
        },
        {
          from: './node_modules/@rnr/toggle-group/src/types.ts',
          to: { folder: 'primitives/toggle-group', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/toggle-group/src/toggle-group.tsx',
          distFrom: 'primitives/toggle-group/toggle-group.tsx',
          to: { folder: 'primitives/toggle-group', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/toggle-group/src/types.ts',
          distFrom: 'primitives/toggle-group/types.ts',
          to: { folder: 'primitives/toggle-group', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'toolbar-primitive',
    dependencies: ['slot-primitive', 'types-primitive', 'utils-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-toolbar'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/toolbar/src/index.ts',
          to: { folder: 'primitives/toolbar', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/toolbar/src/toolbar.web.tsx',
          to: { folder: 'primitives/toolbar', file: 'toolbar.web.tsx' },
        },
        {
          from: './node_modules/@rnr/toolbar/src/toolbar.tsx',
          to: { folder: 'primitives/toolbar', file: 'toolbar.tsx' },
        },
        {
          from: './node_modules/@rnr/toolbar/src/types.ts',
          to: { folder: 'primitives/toolbar', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/toolbar/src/toolbar.tsx',
          distFrom: 'primitives/toolbar/toolbar.tsx',
          to: { folder: 'primitives/toolbar', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/toolbar/src/types.ts',
          distFrom: 'primitives/toolbar/types.ts',
          to: { folder: 'primitives/toolbar', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'tooltip-primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive', 'portal-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-tooltip'],
      'native-only': [],
    },
    paths: {
      universal: [
        {
          from: './node_modules/@rnr/tooltip/src/index.ts',
          to: { folder: 'primitives/tooltip', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/tooltip/src/tooltip.web.tsx',
          to: { folder: 'primitives/tooltip', file: 'tooltip.web.tsx' },
        },
        {
          from: './node_modules/@rnr/tooltip/src/tooltip.tsx',
          to: { folder: 'primitives/tooltip', file: 'tooltip.tsx' },
        },
        {
          from: './node_modules/@rnr/tooltip/src/types.ts',
          to: { folder: 'primitives/tooltip', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/tooltip/src/tooltip.tsx',
          distFrom: 'primitives/tooltip/tooltip.tsx',
          to: { folder: 'primitives/tooltip', file: 'index.tsx' },
        },
        {
          from: './node_modules/@rnr/tooltip/src/types.ts',
          distFrom: 'primitives/tooltip/types.ts',
          to: { folder: 'primitives/tooltip', file: ' types.ts' },
        },
      ],
    },
  },
  {
    name: 'hooks-primitive',
    dependencies: ['types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/hooks/src/index.ts',
        to: { folder: 'primitives/hooks', file: 'index.ts' },
      },
      {
        from: './node_modules/@rnr/hooks/src/useAugmentedRef.tsx',
        to: { folder: 'primitives/hooks', file: 'useAugmentedRef.tsx' },
      },
      {
        from: './node_modules/@rnr/hooks/src/useControllableState.tsx',
        to: { folder: 'primitives/hooks', file: 'useControllableState.tsx' },
      },
      {
        from: './node_modules/@rnr/hooks/src/useRelativePosition.tsx',
        to: { folder: 'primitives/hooks', file: 'useRelativePosition.tsx' },
      },
    ],
  },
  {
    name: 'portal-primitive',
    dependencies: [],
    npmPackages: {
      universal: ['zustand'],
      'native-only': ['zustand'],
    },
    paths: [
      {
        from: './node_modules/@rnr/portal/src/portal.tsx',
        to: { folder: 'primitives', file: 'portal.tsx' },
      },
    ],
  },
  {
    name: 'slot-primitive',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/slot/src/slot.tsx',
        to: { folder: 'primitives', file: 'slot.tsx' },
      },
    ],
  },
  {
    name: 'types-primitive',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/types/src/index.ts',
        to: { folder: 'primitives', file: 'types.ts' },
      },
    ],
  },
  {
    name: 'utils-primitive',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/utils/src/index.ts',
        to: { folder: 'primitives', file: 'utils.ts' },
      },
    ],
  },
];

export const COMPONENTS = [...UI_COMPONENTS, ...PRIMITIVE_COMPONENTS];
