import { type Transformer } from '@/src/utils/transformers';

export const transformJsx: Transformer<String> = async ({ sourceFile, config }) => {
  const output = sourceFile.getFullText();

  return output;
};
