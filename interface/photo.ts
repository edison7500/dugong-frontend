interface PhotoUrl {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

interface PhotoLink {
  self: string,
  html: string,
  download: string,
  download_location: string
}

export interface Photo {
  id: number
  created_at: Date
  updated_at: Date
  blur_hash: string
  urls: PhotoUrl,
  links: PhotoLink,
}
