import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Layout from "../../components/layout/layout";
import {apiBaseUrl} from "../../lib/constants";
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Index = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const _data = data
  const digest = `${_data.digest.slice(0, 100)}...`
  const created_at = moment.unix(_data.created_at_ts)

  return (
    <>
      <Layout title={_data.title} description={digest}>
        <div className="container flex justify-center mx-auto">
          <div className="bg-white py-6 px-8 rounded-lg shadow-md">
            <h1 className="mb-4 text-2xl font-bold">{_data.title}</h1>

            <div className="py-4 text-sm text-slate-400">
              <FontAwesomeIcon icon={faCalendarAlt}/>
              <span className="ml-1 font-light">{created_at.format("yyyy-MM-DD")}</span>
            </div>
            <hr className="my-4 text-slate-400"/>
            <ReactMarkdown className="prose prose-neutral font-light" remarkPlugins={[gfm]}>
              {_data.content}
            </ReactMarkdown>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let data = null

  try {

    const url = `${apiBaseUrl}/api/posts/${query.slug}/`
    const [res] = await Promise.all([fetch(url)])
    if (res.status === 404) {
      return {
        redirect: {
          destination: '404',
          permanent: false,
        },
      }
    }
    [data] = await Promise.all([res.json()])
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data,
    },
  }
}


export default Index;
