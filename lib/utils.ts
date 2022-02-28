export const queryParams = (params: any) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = ({ e1, e2, e3 }: { e1: any; e2: any; e3: any }) => {
  return (
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)
  )
}

export const rgbDataURL = ({ r, g, b }: { r: any; g: any; b: any }) => {
  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet({ e1: 0, e2: r, e3: g }) + triplet({ e1: b, e2: 255, e3: 255 })
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
}
