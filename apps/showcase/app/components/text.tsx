import { TextCascadePreview, TextPreview, TextTypographyPreview } from '@/registry/examples/text';
import { PreviewCarousel } from '@showcase/components/preview-carousel';

const textPreviews = [
  { name: 'Default', component: TextPreview },
  { name: 'Typography', component: TextTypographyPreview },
  { name: 'Cascade', component: TextCascadePreview },
];

export default function TextScreen() {
  return <PreviewCarousel previews={textPreviews} removeBottomSafeArea />;
}
