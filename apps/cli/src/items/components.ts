export const COMPONENTS = [
  {
    name: 'accordion',
    dependencies: ['text'],
    icons: ['ChevronDown'],
    npmPackages: ['@rn-primitives/accordion'],
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
    name: 'alert',
    dependencies: ['text'],
    icons: [],
    npmPackages: [],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/alert.tsx',
        to: {
          folder: 'ui',
          file: 'alert.tsx',
        },
      },
    ],
  },
  {
    name: 'alert-dialog',
    dependencies: ['button', 'text'],
    icons: [],
    npmPackages: ['@rn-primitives/alert-dialog'],
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
    icons: [],
    npmPackages: ['@rn-primitives/aspect-ratio'],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/avatar'],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/slot', '@rn-primitives/types'],
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
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/types'],
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
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/types'],
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
    dependencies: [],
    icons: ['Check'],
    npmPackages: ['@rn-primitives/checkbox'],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/collapsible'],
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
    dependencies: ['text'],
    icons: ['Check', 'ChevronDown', 'ChevronRight', 'ChevronUp'],
    npmPackages: ['@rn-primitives/context-menu'],
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
    dependencies: [],
    icons: ['X'],
    npmPackages: ['@rn-primitives/dialog'],
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
    dependencies: ['text'],
    icons: ['Check', 'ChevronDown', 'ChevronRight', 'ChevronUp'],
    npmPackages: ['@rn-primitives/dropdown-menu'],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/hover-card'],
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
    icons: [],
    npmPackages: [],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/label'],
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
    dependencies: ['text'],
    icons: ['Check', 'ChevronDown', 'ChevronRight', 'ChevronUp'],
    npmPackages: ['@rn-primitives/menubar'],
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
    dependencies: [],
    icons: ['ChevronDown'],
    npmPackages: ['@rn-primitives/navigation-menu'],
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
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/popover'],
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
    name: 'progress',
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/progress'],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/progress.tsx',
        to: {
          folder: 'ui',
          file: 'progress.tsx',
        },
      },
    ],
  },
  {
    name: 'radio-group',
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/radio-group'],
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
    dependencies: [],
    icons: ['Check', 'ChevronDown', 'ChevronUp'],
    npmPackages: ['@rn-primitives/select'],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/separator'],
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
    icons: [],
    npmPackages: [],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/switch'],
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
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/table'],
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
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/tabs'],
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
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/slot', '@rn-primitives/types'],
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
    icons: [],
    npmPackages: [],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/textarea.tsx',
        to: { folder: 'ui', file: 'textarea.tsx' },
      },
    ],
  },
  {
    name: 'toggle',
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/toggle'],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/toggle.tsx',
        to: { folder: 'ui', file: 'toggle.tsx' },
      },
    ],
  },
  {
    name: 'toggle-group',
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/toggle-group'],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/toggle-group.tsx',
        to: { folder: 'ui', file: 'toggle-group.tsx' },
      },
    ],
  },
  {
    name: 'tooltip',
    dependencies: ['text'],
    icons: [],
    npmPackages: ['@rn-primitives/tooltip'],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/tooltip.tsx',
        to: { folder: 'ui', file: 'tooltip.tsx' },
      },
    ],
  },
  {
    name: 'typography',
    dependencies: [],
    icons: [],
    npmPackages: ['@rn-primitives/slot', '@rn-primitives/types'],
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/typography.tsx',
        to: { folder: 'ui', file: 'typography.tsx' },
      },
    ],
  },
];
