function getPos(xcenter: number, ycenter: number, x: number, y: number, _rotate: number) {
  const rotate = _rotate * Math.PI / 180
  const x1 = (x - xcenter) * Math.cos(rotate) - (y - ycenter) * Math.sin(rotate) + xcenter
  const y1 = (x - xcenter) * Math.sin(rotate) + (y - ycenter) * Math.cos(rotate) + ycenter
  return { x: x1, y: y1 }
}

export const transForm = (width: number, height: number, rotate: number) => {
  const xcenter = width / 2
  const ycenter = height / 2
  const res = [
    getPos(xcenter, ycenter, 0, height, 180 - rotate),
    getPos(xcenter, ycenter, width, height, 180 - rotate),
    getPos(xcenter, ycenter, width, 0, 180 - rotate),
    getPos(xcenter, ycenter, 0, 0, 180 - rotate)
  ]
  const xList: number[] = []; const yList: number[] = []
  res.map(v => {
    xList.push(v.x)
    yList.push(v.y)
  })
  return { x: Math.round(Math.max(...xList) - Math.min(...xList)), y: Math.round(Math.max(...yList) - Math.min(...yList)) }
}

export function getMaxPow(total: number) {
  let _total = total
  while (_total >= 360) {
    _total -= 360
  }
  return _total
}

const dataURItoBuffer = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1])
  const buffer = new ArrayBuffer(byteString.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i)
  }
  return buffer
}

export const dataURItoBlob = (dataURI: string) => {
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
  const buffer = dataURItoBuffer(dataURI)
  return new Blob([buffer], { type: mimeString })
}