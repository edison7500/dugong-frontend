import {IPost} from "./interface";
import moment from 'moment';

const Index = (post: IPost): JSX.Element => {

  const created_at = moment.unix(post.created_at_ts)

  return (
    <div className="mt-6">
      <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">{created_at.format("yyyy-MM-DD HH:mm:ss")}</span>
        </div>
        <div className="mt-2">
          <h1 className="text-2xl font-bold text-gray-700 hover:underline">{post.title}</h1>
          <p className="mt-2 text-gray-500">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index;
