import { IPost, ITag } from "../interface"
import moment from "moment"
import Link from "next/link"
import Tag from "./_tag"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"

const Post = (post: IPost): JSX.Element => {
  const created_at = moment.unix(post.created_at_ts)
  const digest = post.digest
  const tagNumber = Number(post.tags?.length)

  return (
    <div className="card-body">
      <h1 className="card-title">
        <Link href={`/blog/${post.slug}`}>
          <a
            className="text-2xl font-bold text-base-content hover:underline"
            title={post.title}>
            {post.title}
          </a>
        </Link>
      </h1>
      <p className="mt-4 text-base-content font-light">{digest}...</p>

      <div className="mt-6 card-actions justify-between">
        <div className="text-sm">
          {tagNumber > 0 ? (
            <FontAwesomeIcon icon={faTags} className="mr-2" />
          ) : null}
          {post.tags?.map((tag: ITag) => (
            <span key={tag.slug}>
              <Tag {...tag} />
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          <span className="font-light">{created_at.format("yyyy-MM-DD")}</span>
        </div>
      </div>
    </div>
  )
}

export default Post
