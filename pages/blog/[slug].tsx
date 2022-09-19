import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import moment from "moment"
import { NextSeo } from "next-seo"
import ReactMarkdown from "react-markdown"
import { Layout } from "../../components/layout"
import { apiBaseUrl } from "../../lib/constants"
import gfm from "remark-gfm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faTags, faHome, faFileText } from "@fortawesome/free-solid-svg-icons"
import { ITag, IPost } from "../../interface"
import Tag from "../../components/_tag"
import Spinner from "../../components/_spinner"

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  let data = null
  const url = `${apiBaseUrl}/api/posts/${context.params?.slug}/`

  const res = await fetch(url)
  data = await res.json()

  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 600,
  }
}

const Index = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  const _data: IPost = data
  const digest = `${_data.digest?.slice(0, 100)}...`
  const created_at = moment.unix(_data.created_at_ts)
  const updated_at = moment.unix(_data.updated_at_ts)
  const tagNumber = Number(_data.tags?.length)

  const openGraph = {
    title: _data.title,
    description: digest,
    url: `https://www.jiaxin.im/blog/${_data.slug}`,
    type: "article",
    article: {
      publishedTime: created_at.format(),
      modifiedTime: updated_at.format(),
      tags: _data.tags?.map((tag: ITag) => tag.name) || [],
    },
  }

  return (
    <Layout title={`${_data.title} | Python 观察员`}>
      <NextSeo
        title={`${_data.title} | Python 观察员`}
        description={digest}
        openGraph={openGraph}
      />

      <div className="container flex justify-center mx-auto">
        <div className="bg-base-100 shrink w-8/12">
          <div className="px-8 text-sm breadcrumbs">
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
              <div className="text-sm text-base-content">
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
              {_data.content ? _data.content : ""}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export default Index
