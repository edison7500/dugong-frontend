import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {BreadcrumbJsonLd} from 'next-seo';
import Layout from "../../components/layout/layout";
import {apiBaseUrl} from "../../lib/constants";
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
// import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons"
// import store from "../../lib/store";

import {Web3ReactProvider, useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
// import {Provider} from 'react-redux'
import {getLibrary} from "../../lib/connectors";


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


const Index = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const _data = data
  const digest = `${_data.digest.slice(0, 100)}...`
  const created_at = moment.unix(_data.created_at_ts)
  // const tagNumber = Number(_data.tags.length)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/*<Provider store={store}>*/}
      <Layout title={_data.title} description={digest} canonical={`https://jiaxin.im/blog/${_data.slug}`}>
        <div className="container flex justify-center mx-auto">

          <div className="bg-white shrink w-8/12 py-6 px-8 rounded-lg shadow-md">
            <h1 className="mb-4 text-3xl font-bold">{_data.title}</h1>

            <div className="py-4 text-sm text-slate-400">
              <FontAwesomeIcon icon={faClock}/>
              <span className="ml-1 font-light">{created_at.format("yyyy-MM-DD")}</span>
            </div>
            <hr className="my-4 text-slate-400"/>

            <ReactMarkdown className="prose prose-neutral font-light max-w-none" remarkPlugins={[gfm]}>
              {_data.content}
            </ReactMarkdown>
          </div>

        </div>
      </Layout>
      {/*</Provider>*/}
    </Web3ReactProvider>
  )
}


export default Index;
