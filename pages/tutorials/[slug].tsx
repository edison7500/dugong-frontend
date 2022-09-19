import { Layout } from "../../components/layout"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import Link from "next/link"
import { apiBaseUrl } from "../../lib/constants"

export const getServerSideProps: GetServerSideProps = async context => {
  let data

  const url = `${apiBaseUrl}/api/tutorials/${context.query.slug}/`

  try {
    const [res] = await Promise.all([fetch(url)])
    if (res.status === 404) {
      return {
        redirect: {
          destination: "404",
          permanent: false,
        },
      }
    }
    ;[data] = await Promise.all([res.json()])
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
  const tutorial = data
  const digest = `${tutorial.content.slice(0, 100)}...`
  const created_at = moment.unix(tutorial.created_at_ts)
  const updated_at = moment.unix(tutorial.updated_at_ts)

  // @ts-ignore
  return (
    <Layout title={tutorial.title} description={digest}>
      <div className="container flex justify-center mx-auto">
        <div className="shrink w-8/12">
          <article className="bg-base-200 rounded-lg shadow-xl p-6">
            <h1 className="mb-4 text-3xl font-bold text-center text-base-content">
              {tutorial.title}
            </h1>

            <div className="flex justify-end">
              <div className="text-sm font-light text-slate-400">
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
              {data.content}
            </ReactMarkdown>
          </article>

          <div className="divider"></div>

          <Link href={data.origin_link}>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-base-content link linl-hover">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              <span className="ml-2">{data.origin_link}</span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Index
