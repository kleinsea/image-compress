export interface ImageRotationOptions {
  maxLength?: number;
  quality?: number;
  background?: string;
  isDrawPngBg?: boolean;
}

export type ImageRotationFile = File | string;
export type ImageRotationDownloadType = 'image/png' | 'image/jpeg' | 'image/webp';

export declare class ImageRotation {
  generate(rotate?: number, downloadType?: ImageRotationDownloadType): Promise<string>;
  toBlob(dataURI: string): Promise<Blob>;
}