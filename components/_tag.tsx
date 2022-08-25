import Link from "next/link"
import { ITag } from "../interface"

const Tag = (tag: ITag): JSX.Element => {
  return (
    <>
      <Link href={`/tags/${tag.slug}`}>
        <a className="font-light mx-1 btn btn-outline btn-xs" title={tag.name}>
          {tag.name}
        </a>
      </Link>
    </>
  )
}

export default Tag
