# image-rotation
This module can help the image complete compression and support rotation operations at any angle.
## Installation
```bash
  npm install --save image-rotation
```
## Usage
```js
let imageRotate
import ImageRotation from 'image-rotation'
imageRotate = new ImageRotation('your html file data', options)
imageRotate.generate('rotate angle', downloadType) // 
```
## APIs
### new ImageRotation
key | desc | type | defalut
----|------|----|----
file(required)| input[type=file] data |File or base64| null
options| options |object|{}
#### options(object)
key | desc | type | defalut
----|------|----|----
maxLength| The maximum edge size |number| null
quality|compression quality|number|0.92
background|bacnground|string|null
isDrawPngBg| whether to draw background for image/png | boolean | false
```js
import ImageRotation from 'image-rotation'
const imageRotate = new ImageRotation('your html file data', {
  maxLength: 2000,
  quality: 0.8,
  background: "#fff",
  isDrawPngBg: true
})
```
### generate(rotate?: number, downloadType?: DownloadType): Promise<string>
key | desc | type | defalut
----|------|----|----
rotate| rotation angle |Number| 0
downloadType| image type |string|image/jpeg
```js
const imageRotate = new ImageRotation('your html file data')
imageRotate.generate(45, 'image/png').then(res=> {
  // base64
}).catch()
```
### toBlob(dataURI: string): Promise<Blob>
key | desc | type |
----|------|----
dataURI(required)| base64 file |string|
```js
const imageRotate = new ImageRotation('your html file data')
imageRotate.generate(0, 'image/png').then(res=> {
  // base64
  imageRotate.toBlob(res).then(blob=> {
    // blob
  })
})
```


