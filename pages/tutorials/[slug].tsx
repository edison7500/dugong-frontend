import Layout from '../../components/layout/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { apiBaseUrl } from '../../lib/constants'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async context => {
  let data

  const url = `${apiBaseUrl}/api/tutorials/${context.query.slug}/`

  try {
    const [res] = await Promise.all([fetch(url)])
    if (res.status === 404) {
      return {
        redirect: {
          destination: '404',
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

  return (
    <Layout title={tutorial.title} description={digest}>
      <div className="container flex justify-center mx-auto">
        <div className="bg-white shrink w-8/12 py-6 px-8 rounded-lg shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-center">
            {tutorial.title}
          </h1>

          <div className="py-4 text-sm text-slate-400">
            <FontAwesomeIcon icon={faClock} />
            <span className="ml-1 font-light">
              {created_at.format('yyyy-MM-DD')}
            </span>
          </div>
          <hr className="my-4 text-slate-400" />

          <ReactMarkdown
            className="prose prose-neutral font-light max-w-none"
            remarkPlugins={[gfm]}
          >
            {data.content}
          </ReactMarkdown>

          <hr className="mt-4 mb-10 text-slate-400" />

          <Link href={data.origin_link}>
            {/* eslint-disable-next-line react/no-string-refs */}
            <a
              target="_blank"
              className="text-gray-400 hover:underline"
              ref="nofollow"
            >
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
