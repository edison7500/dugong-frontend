import {IPost, Tag} from "./interface";
import moment from 'moment';
import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faTags} from "@fortawesome/free-solid-svg-icons";

const Index = (post: IPost): JSX.Element => {

  const created_at = moment.unix(post.created_at_ts)
  const digest = post.digest.slice(0, 100)

  return (

    <div className="mt-6">
      <div className="max-w-4xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md">
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Link href={`/blog/${post.slug}`}>
          <h1 className="text-2xl font-bold text-gray-700 hover:underline">{post.title}</h1>
        </Link>
        <p className="mt-4 text-gray-500 font-light">
          {digest}...
        </p>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <FontAwesomeIcon icon={faTags} className="mr-2"/>
            {
              post.tags?.map((tag: Tag) => (
                <>
                  <span className="font-light mx-2 p-1 rounded-md bg-gray-200 hover:text-white hover:bg-gray-400">
                    {tag.name}
                  </span>
                </>
              ))
            }
          </p>
          <p className="text-sm text-gray-600">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2"/>
            <span className="font-light">{created_at.format("yyyy-MM-DD")}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index;
