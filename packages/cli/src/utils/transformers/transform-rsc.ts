import { Transformer } from '@/src/utils/transformers';

export const transformRsc: Transformer = async ({ sourceFile, config }) => {
  return sourceFile;
};
