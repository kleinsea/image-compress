import { ImageRotationFile, ImageRotationOptions, ImageRotationDownloadType } from '../types/index'
import { transForm, getMaxPow, dataURItoBlob } from './utils/transForm'

export default class ImageRotation {
  private file: ImageRotationFile;
  private options: ImageRotationOptions;
  private deg: number;
  private downloadType: ImageRotationDownloadType;
  constructor(file: ImageRotationFile, options?: ImageRotationOptions) {
    this.file = file
    this.options = {
      isDrawPngBg: false,
      quality: 0.92,
      ...options
    },
    this.deg = 0
    this.downloadType = 'image/jpeg'
  }
  public generate(deg: number = 0, downloadType: ImageRotationDownloadType = 'image/jpeg'): Promise<string> {
    if (['image/jpeg', 'image/jpeg', 'image/webp'].includes(downloadType)) {
      this.downloadType = downloadType
    } else {
      this.downloadType = 'image/jpeg'
    }
    this.downloadType = downloadType
    let _deg = Math.abs(deg) - getMaxPow(Math.abs(deg))
    if (_deg <= 360 && _deg >= 0) {
      this.deg = deg >= 0 ? _deg : 360 - _deg
    } else {
      this.deg = 0
    }
    return new Promise(async (resolve, reject) => {
      let imageUrl: string
      try {
        imageUrl = await this.loadImage()
      } catch (error) {
        reject(error as string)
        return false
      }
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = imageUrl
      img.onload = async () => {
        const canvas = this.getCanvasData(img)
        const res: string = this.downLoadFile(canvas)
        resolve(res)
      }
    })
  }
  private getCanvasData(img: HTMLImageElement) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const { maxLength = 0 } = this.options
    let w = img.width
    let h = img.height
    const { x, y } = transForm(w, h, this.deg)
    let fx = x, fy = y;
    if (maxLength && Math.max(x, y) > maxLength) {
      if (x < y) {
        fx = (maxLength * x) / y
        fy = maxLength
      } else {
        fx = maxLength
        fy = (maxLength * y) / x
      }
    }
    fx = Math.ceil(fx)
    fy = Math.ceil(fy)
    if(fx !== x || fy !== y) {
      // revised
      w = Math.ceil(w * (fx / x))
      h = Math.ceil(h * (fy / y))
    }

    canvas.width = fx
    canvas.height = fy
    if (this.options.background && (this.downloadType !== 'image/png' || this.downloadType === 'image/png' && this.options.isDrawPngBg === true)) {
      ctx.fillStyle = this.options.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    ctx.translate(
      canvas.width / 2,
      canvas.height / 2
    )
    ctx.rotate(this.deg * Math.PI / 180)
    ctx.drawImage(img, -w / 2, -h / 2, w, h)
    return canvas
  }
  private loadImage(): Promise<string> {
    return new Promise((resolve: (arg0: string) => void, reject: (arg0: string) => any) => {
      const reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i
      if (typeof this.file === 'string') {
        if (reg.test(this.file)) {
          resolve(this.file)
        } else {
          return reject('Image cannot be correctly interpreted.')
        }
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = function () {
          return resolve(this.result as string)
        }
        reader.onerror = () => reject('Image cannot be correctly interpreted.')
      }
    })
  }
  private downLoadFile(canvas: HTMLCanvasElement) {
    let dataURL;
    if (this.downloadType === 'image/png') {
      dataURL = canvas.toDataURL(this.downloadType)
    } else {
      dataURL = canvas.toDataURL(this.downloadType, this.options.quality)
    }
    return dataURL
  }
  public toBlob(dataURI: string) {
    return dataURItoBlob(dataURI)
  }
}