import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import moment from "moment"
import ReactMarkdown from "react-markdown"
import { Layout } from "../../components/layout"
import { apiBaseUrl } from "../../lib/constants"
import gfm from "remark-gfm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faTags, faHome, faFileText } from "@fortawesome/free-solid-svg-icons"
import { ITag } from "../../interface"
import Tag from "../../components/_tag"

export const getServerSideProps: GetServerSideProps = async context => {
  let data = null
  // const slug = context.query.slug
  const url = `${apiBaseUrl}/api/posts/${context.query.slug}/`

  try {
    const [response] = await Promise.all([fetch(url)])
    if (response.status === 404) {
      return {
        redirect: {
          destination: "404",
          permanent: false,
        },
      }
    }
    ;[data] = await Promise.all([response.json()])
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data,
    },
  }
}

const Index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const _data = data
  const digest = `${_data.digest.slice(0, 100)}...`
  const created_at = moment.unix(_data.created_at_ts)
  const tagNumber = Number(_data.tags.length)

  return (
    <Layout
      title={`${_data.title} | Python 观察员`}
      description={digest}
      canonical={`https://www.jiaxin.im/blog/${_data.slug}`}>
      <div className="container flex justify-center mx-auto">
        <div className="bg-base-100 shrink w-8/12">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href={"/"}>
                  <a title="Python 观察员">
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faFileText} className="mr-2" />
                {_data.title}
              </li>
            </ul>
          </div>

          <article
            className="mt-4 p-8 rounded-lg shadow-md border-slate-800"
            itemScope={true}
            itemType="https://schema.org/Article">
            <h1
              className="mb-8 text-4xl font-bold text-center"
              itemProp={"name"}>
              {_data.title}
            </h1>

            <div className="pt-4 flex justify-between">
              <div className="text-sm text-gray-600">
                {tagNumber > 0 ? (
                  <FontAwesomeIcon icon={faTags} className="mr-2" />
                ) : (
                  ""
                )}
                {_data.tags?.map((tag: ITag) => (
                  <>
                    <Tag {...tag} />
                  </>
                ))}
              </div>

              <div className="text-sm text-slate-400">
                <FontAwesomeIcon icon={faClock} />
                <span className="ml-1 font-light">
                  {created_at.format("yyyy-MM-DD")}
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <ReactMarkdown
              className="prose prose-neutral font-light max-w-none"
              remarkPlugins={[gfm]}>
              {_data.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export default Index
