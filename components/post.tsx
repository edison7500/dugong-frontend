import {IPost, ITag} from "./interface";
import moment from 'moment';
import Link from "next/link";
import Tag from "./_tag"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTags} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons"


const Post = (post: IPost): JSX.Element => {

  const created_at = moment.unix(post.created_at_ts)
  const digest = post.digest
  const tagNumber = Number(post.tags?.length)

  return (
    // <div className="mt-6">
    <div className="max-w-4xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <h1>
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl font-bold text-gray-700 hover:underline" title={post.title}>
            {post.title}
          </a>
        </Link>
      </h1>
      <p className="mt-4 text-gray-500 font-light">
        {digest}...
      </p>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {tagNumber > 0 ? <FontAwesomeIcon icon={faTags} className="mr-2"/> : ""}
          {
            post.tags?.map((tag: ITag) => (
              <>
                <Tag {...tag}/>
              </>
            ))
          }
        </p>
        <p className="text-sm text-gray-600">
          <FontAwesomeIcon icon={faClock} className="mr-2"/>
          <span className="font-light">{created_at.format("yyyy-MM-DD")}</span>
        </p>
      </div>
    </div>
    // </div>
  )
}

export default Post;
