export interface PhotoUrl {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

export interface Photo {
  id: number
  created_at: Date
  updated_at: Date
  blur_hash: string
  urls: PhotoUrl
}
