import { ImageProps } from 'next/image';

export interface ImageWithFallbackProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  blurHash?: string;
}
