function getPos(xcenter: number, ycenter: number, x: number, y: number, _rotate: number) {
  const rotate = _rotate * Math.PI / 180
  const x1 = (x - xcenter) * Math.cos(rotate) - (y - ycenter) * Math.sin(rotate) + xcenter
  const y1 = (x - xcenter) * Math.sin(rotate) + (y - ycenter) * Math.cos(rotate) + ycenter
  return { x: x1, y: y1 }
}

export let transForm = (width: number, height: number, rotate: number) => {
  const xcenter = width / 2
  const ycenter = height / 2
  const res = [
    getPos(xcenter, ycenter, 0, height, 180 - rotate),
    getPos(xcenter, ycenter, width, height, 180 - rotate),
    getPos(xcenter, ycenter, width, 0, 180 - rotate),
    getPos(xcenter, ycenter, 0, 0, 180 - rotate)
  ]
  let x1 = 0, y1 = 0, x2 = 0, y2 = 0
  res.map(v => {
    if (v.x > x1) { x1 = v.x }
    if (v.x < x2) { x2 = v.x }
    if (v.y > y1) { y1 = v.y }
    if (v.y < y2) { y2 = v.y }
  })
  return { x: Math.ceil(x1 - x2), y: Math.ceil(y1 - y2) }
}

export function getMaxPow(total: number) {
  let i = 0
  while (total >= Math.pow(360, i)) {
    i++
  }
  return Math.pow(360, i - 1)
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