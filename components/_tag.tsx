import Link from "next/link"
import {ITag} from "./interface"

const Index = (tag: ITag): JSX.Element => {

  return (
    <>
      <Link href={`/tags/${tag.slug}`}>
        <a className="font-light mx-2 p-1 rounded-md bg-gray-200
              hover:text-white hover:bg-gray-400 hover:underline"
        >
          {tag.name}
        </a>
      </Link>
    </>
  )
}

export default Index;
