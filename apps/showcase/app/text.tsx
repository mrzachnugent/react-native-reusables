import { PreviewCarousel } from '@showcase/components/preview-carousel';
import {
  TextCascadePreview,
  TextPreview,
  TextTypographyPreview,
} from '@showcase/components/styles/examples';

const textPreviews = [
  { name: 'Default', component: TextPreview },
  { name: 'Typography', component: TextTypographyPreview },
  { name: 'Cascade', component: TextCascadePreview },
];

export default function TextScreen() {
  return <PreviewCarousel previews={textPreviews} />;
}
