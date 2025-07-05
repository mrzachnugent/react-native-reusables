# Component Documentation Update Guide

This guide provides step-by-step instructions for updating component documentation files to use the new preview and code structure pattern, as demonstrated in the accordion component.

## Overview

The new pattern separates default and New York style previews and code snippets, providing a better user experience with style switching capabilities.

## Step 1: Update Import Statements

### Before:

```tsx
import accordionPreview from '!!raw-loader!@/registry/new-york/examples/accordion';
import { AccordionPreview } from '@docs/components/new-york-previews';
```

### After:

```tsx
import accordionPreview from '!!raw-loader!@/registry/default/examples/accordion';
import accordionNewYorkPreview from '!!raw-loader!@/registry/new-york/examples/accordion';
import { AccordionPreview } from '@docs/components/default-previews';
import { AccordionPreview as AccordionNewYorkPreview } from '@docs/components/new-york-previews';
```

**Key Changes:**

- Add `Preview` suffix to the default import variable name
- Add `NewYorkPreview` suffix to the New York import variable name
- Import both default and New York preview components
- Use alias for New York preview component to avoid naming conflicts

## Step 2: Update PreviewCard Component

### Before:

```tsx
<PreviewCard copyContent={accordionPreview} webPreview={<AccordionPreview />} />
```

### After:

```tsx
<PreviewCard
  copyContent={accordionPreview}
  webPreview={<AccordionPreview />}
  webNewYorkPreview={<AccordionNewYorkPreview />}
/>
```

**Key Changes:**

- Add `webNewYorkPreview` prop
- Pass the New York preview component as the value

## Step 3: Add ShowIfStyle Component

### Add Import

Add the ShowIfStyle import at the top of the file:

```tsx
import { ShowIfStyle } from '@docs/components/show-if-style';
```

### Replace Code Section

Replace the existing code section:

#### Before:

````tsx
<SectionTabsContent value="code">
  ```json doc-gen:file
  {
    "file": "./node_modules/@rnr/registry/src/new-york/examples/accordion.tsx",
    "codeblock": {
      "lang": "tsx"
    }
  }
````

</SectionTabsContent>
```

#### After:

````tsx
<SectionTabsContent value="code">
  <ShowIfStyle style="default">
  ```json doc-gen:file
  {
    "file": "./node_modules/@rnr/registry/src/default/examples/[component-name].tsx",
    "codeblock": {
      "lang": "tsx"
    }
  }
````

  </ShowIfStyle>
  <ShowIfStyle style="new-york">
  ```json doc-gen:file
  {
    "file": "./node_modules/@rnr/registry/src/new-york/examples/[component-name].tsx",
    "codeblock": {
      "lang": "tsx"
    }
  }
  ```
  </ShowIfStyle>
</SectionTabsContent>
```

**Key Changes:**

- Import `ShowIfStyle` component
- Wrap each code block with `ShowIfStyle` component
- Use `style="default"` for default style code block
- Use `style="new-york"` for New York style code block
- Update file paths to match the respective style directories

## Complete Example

Here's a complete example showing all the changes for a hypothetical "button" component:

### Updated Imports Section:

```tsx
import buttonPreview from '!!raw-loader!@/registry/default/examples/button';
import buttonNewYorkPreview from '!!raw-loader!@/registry/new-york/examples/button';
import { CommandTabs } from '@docs/components/command-tabs';
import { CopyButton } from '@docs/components/copy-button';
import { ExternalLinks } from '@docs/components/external-links';
import { PreviewCard } from '@docs/components/preview-card';
import {
  SectionTabs,
  SectionTabsContent,
  SectionTabsList,
  SectionTabsTrigger,
} from '@docs/components/section-tabs';
import { ButtonPreview } from '@docs/components/default-previews';
import { ButtonPreview as ButtonNewYorkPreview } from '@docs/components/new-york-previews';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { ShowIfStyle } from '@docs/components/show-if-style';
```

### Updated Preview Section:

```tsx
<PreviewCard
  copyContent={buttonPreview}
  webPreview={<ButtonPreview />}
  webNewYorkPreview={<ButtonNewYorkPreview />}
/>
```

### Updated Code Section:

````tsx
<SectionTabsContent value="code">
  <ShowIfStyle style="default">
  ```json doc-gen:file
  {
    "file": "./node_modules/@rnr/registry/src/default/examples/button.tsx",
    "codeblock": {
      "lang": "tsx"
    }
  }
````

  </ShowIfStyle>
  <ShowIfStyle style="new-york">
  ```json doc-gen:file
  {
    "file": "./node_modules/@rnr/registry/src/new-york/examples/button.tsx",
    "codeblock": {
      "lang": "tsx"
    }
  }
  ```
  </ShowIfStyle>
</SectionTabsContent>
```

## File Structure Summary

After completing all steps, your file structure should look like this:

```
apps/docs/
└── content/docs/(components)/
    └── [component-name].mdx (updated)
```

**Note:** No additional snippet files are needed with this approach.

## Naming Conventions

- **Component names**: Use kebab-case for file names
- **Import variables**: Use camelCase with `Preview` and `NewYorkPreview` suffixes
- **Import aliases**: Use `as [ComponentName]NewYorkPreview` for New York preview components
- **Style attributes**: Use `style="default"` and `style="new-york"` for ShowIfStyle components

## Testing

After making these changes:

1. Verify the preview tab shows both default and New York styles
2. Verify the code tab allows switching between default and New York code
3. Check that all imports resolve correctly
4. Ensure the file paths in the JSON blocks reference the correct registry paths

## Common Issues

1. **Import path errors**: Ensure the registry paths in the JSON blocks match your actual file structure
2. **Component naming conflicts**: Always use aliases for New York preview components
3. **Missing preview components**: Verify that both default and New York preview components exist in the respective preview files
4. **ShowIfStyle syntax**: Ensure the ShowIfStyle components are properly wrapped around the code blocks
5. **Style attribute values**: Use exactly `"default"` and `"new-york"` as the style attribute values
