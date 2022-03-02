import { ReactNode } from 'react'

export interface MetaProps {
  title?: string
  description?: string
  canonical?: string
  keyword?: string
}

export interface Props extends MetaProps {
  children: ReactNode
  // title?: string
  // description?: string
}

export interface ITag {
  // id:number
  slug: string
  name: string
}

export interface IPost {
  slug: string
  title: string
  digest?: string
  content?: string
  created_at_ts: number
  updated_at_ts: number
  tags?: ITag[]
}

export interface Tutorial {
  slug: string
  cover_url: string
  title: string
  content?: string
  created_at_ts: number
  published_at_ts: string
  tags?: ITag[]
  origin_link?: string
}
