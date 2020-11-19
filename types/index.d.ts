export interface ImageRotationOptions {
  /**
   * The maximum edge size
   */
  maxLength?: number;
  /**
   * compression quality
   */
  quality?: number;
  /**
   * background color
   */
  background?: string;
  /**
   * whether to draw background for image/png
   */
  isDrawPngBg?: boolean;
}

export type ImageRotationFile = File | string;
export type ImageRotationDownloadType = 'image/png' | 'image/jpeg' | 'image/webp';

export default class ImageRotation {
  /**
   * Creates an instance of ImageRotation.
   * @param {ImageRotationFile} file File | string
   * @param {ImageRotationOptions} [options]
   * @memberof ImageRotation
   */
  constructor(file: ImageRotationFile, options?: ImageRotationOptions);
  /**
   * @param {number} [rotate] rotation angle
   * @param {ImageRotationDownloadType} [downloadType] type: image/png | image/jpeg | image/webp 
   * @returns {Promise<string>} base64 image
   * @memberof ImageRotation
   */
  generate(rotate?: number, downloadType?: ImageRotationDownloadType): Promise<string>;
  /**
   * @param {string} dataURI
   * @returns {Blob}
   * @memberof ImageRotation
   */
  toBlob(dataURI: string): Blob;
}