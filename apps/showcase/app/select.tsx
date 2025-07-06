import { PreviewCarousel } from '@showcase/components/preview-carousel';
import { ScrollableSelectPreview, SelectPreview } from '@showcase/components/styles/examples';
import * as React from 'react';

const selectPreviews = [
  { name: 'Default', component: SelectPreview },
  { name: 'Scrollable', component: ScrollableSelectPreview },
];

export default function SelectScreen() {
  return <PreviewCarousel previews={selectPreviews} />;
}
