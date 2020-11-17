export interface ImageCompressOptions {
  maxLength?: number;
  quality?: number;
  background?: string;
  isDrawPngBg?: boolean;
}

export type ImageCompressFile = File | string;
export type ImageCompressDownloadType = 'image/png' | 'image/jpeg' | 'image/webp';

export declare class ImageCompress {
  generate(rotate: number, downloadType?: ImageCompressDownloadType): Promise<string>;
  toBlob(dataURI: string): Promise<Blob>;
}