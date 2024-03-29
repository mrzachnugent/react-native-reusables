import { Transformer } from '@/src/utils/transformers';

export const transformTwPrefixes: Transformer = async ({ sourceFile, config }) => {
  return sourceFile;
};
