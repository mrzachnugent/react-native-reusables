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
          to: { folder: 'primitives/accordion', file: 'accordion.web.ts' },
        },
        {
          from: './node_modules/@rnr/accordion/src/accordion.tsx',
          to: { folder: 'primitives/accordion', file: 'accordion.ts' },
        },
        {
          from: './node_modules/@rnr/accordion/src/types.ts',
          to: { folder: 'primitives/accordion', file: 'types.ts' },
        },
      ],
      'native-only': [
        {
          from: './node_modules/@rnr/accordion/src/accordion.tsx',
          to: { folder: 'primitives/accordion', file: 'index.ts' },
        },
        {
          from: './node_modules/@rnr/accordion/src/types.tsx',
          to: { folder: 'primitives/accordion', file: ' types.ts' },
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
];

export const COMPONENTS = [...UI_COMPONENTS, ...PRIMITIVE_COMPONENTS];
