import { PreviewCarousel } from '@showcase/components/preview-carousel';
import {
  ButtonDestructivePreview,
  ButtonGhostPreview,
  ButtonIconPreview,
  ButtonLinkPreview,
  ButtonLoadingPreview,
  ButtonOutlinePreview,
  ButtonPreview,
  ButtonSecondaryPreview,
  ButtonWithIconPreview,
} from '@showcase/components/styles/examples';
import * as React from 'react';

const buttonPreviews = [
  { name: 'Default', component: ButtonPreview },
  { name: 'Destructive', component: ButtonDestructivePreview },
  { name: 'Ghost', component: ButtonGhostPreview },
  { name: 'Link', component: ButtonLinkPreview },
  { name: 'Loading', component: ButtonLoadingPreview },
  { name: 'Outline', component: ButtonOutlinePreview },
  { name: 'Secondary', component: ButtonSecondaryPreview },
  { name: 'With Icon', component: ButtonWithIconPreview },
  { name: 'Icon', component: ButtonIconPreview },
];

export default function ButtonScreen() {
  return <PreviewCarousel previews={buttonPreviews} />;
}
