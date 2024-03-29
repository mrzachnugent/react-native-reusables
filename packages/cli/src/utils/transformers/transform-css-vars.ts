import { Transformer } from '@/src/utils/transformers';

export const transformCssVars: Transformer = async ({ sourceFile, config, baseColor }) => {
  return sourceFile;
};

// Splits a className into variant-name-alpha.
// eg. hover:bg-primary-100 -> [hover, bg-primary, 100]
export function splitClassName(className: string): (string | null)[] {
  if (!className.includes('/') && !className.includes(':')) {
    return [null, className, null];
  }

  const parts: (string | null)[] = [];
  // First we split to find the alpha.
  let [rest, alpha] = className.split('/');

  // Check if rest has a colon.
  if (!rest.includes(':')) {
    return [null, rest, alpha];
  }

  // Next we split the rest by the colon.
  const split = rest.split(':');

  // We take the last item from the split as the name.
  const name = split.pop();

  // We glue back the rest of the split.
  const variant = split.join(':');

  // Finally we push the variant, name and alpha.
  parts.push(variant ?? null, name ?? null, alpha ?? null);

  return parts;
}
