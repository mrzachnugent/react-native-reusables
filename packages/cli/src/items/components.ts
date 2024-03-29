export const COMPONENTS = [
  {
    name: 'accordion',
    type: 'ui',
    dependencies: ['accordion-primitive', 'text'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/reusables/src/components/ui/accordion.tsx',
        to: '/accordion.tsx',
      },
    ],
  },
  {
    name: 'accordion-primitive',
    type: 'primitive',
    dependencies: ['hooks-primitive', 'slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: ['@radix-ui/react-accordion'],
      'native-only': [],
    },
    paths: {
      universal: [
        { from: './node_modules/@rnr/accordion/src/index.ts', to: '/accordion/index.ts' },
        {
          from: './node_modules/@rnr/accordion/src/accordion.web.ts',
          to: '/accordion/accordion.web.ts',
        },
        { from: './node_modules/@rnr/accordion/src/accordion.ts', to: '/accordion/accordion.ts' },
        { from: './node_modules/@rnr/accordion/src/types.ts', to: '/accordion/types.ts' },
      ],
      'native-only': [
        { from: './node_modules/@rnr/accordion/src/accordion.ts', to: '/accordion/index.ts' },
        { from: './node_modules/@rnr/accordion/src/types.ts', to: '/accordion/types.ts' },
      ],
    },
  },
  {
    name: 'text',
    type: 'ui',
    dependencies: ['slot-primitive', 'types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [{ from: './node_modules/@rnr/reusables/src/components/ui/text.tsx', to: '/text.tsx' }],
  },
  {
    name: 'hooks-primitive',
    type: 'primitive',
    dependencies: ['types-primitive'],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      { from: './node_modules/@rnr/hooks/src/index.ts', to: '/hooks/index.ts' },
      {
        from: './node_modules/@rnr/hooks/src/useAugmentedRef.tsx',
        to: '/hooks/useAugmentedRef.tsx',
      },
      {
        from: './node_modules/@rnr/hooks/src/useControllableState.tsx',
        to: '/hooks/useControllableState.tsx',
      },
      {
        from: './node_modules/@rnr/hooks/src/useRelativePosition.tsx',
        to: '/hooks/useRelativePosition.tsx',
      },
    ],
  },
  {
    name: 'slot-primitive',
    type: 'primitive',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/slot/src/slot.tsx',
        to: '/slot.tsx',
      },
    ],
  },
  {
    name: 'types-primitive',
    type: 'primitive',
    dependencies: [],
    npmPackages: {
      universal: [],
      'native-only': [],
    },
    paths: [
      {
        from: './node_modules/@rnr/types/src/index.ts',
        to: '/types.ts',
      },
    ],
  },
];
