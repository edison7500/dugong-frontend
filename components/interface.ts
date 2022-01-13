import {ReactNode} from "react";


export interface MetaProps {
  title?: string,
  description?: string,
  keyword?: string,
}

export interface Props extends MetaProps {
  children: ReactNode,
  // title?: string
  // description?: string
}

export interface ITag {
  // id:number
  slug: string
  name: string
}

export interface IPost {
  slug: string,
  title: string,
  digest: string,
  content: string,
  created_at_ts: number
  tags?: ITag[]
}

// export interface Posts {
//   posts: IPost[],
// }
