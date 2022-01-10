import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
// import ReactPaginate from 'react-paginate';
import Layout from "../components/layout/layout";
import {IPost} from "../components/interface";
import Post from "../components/post";
import {apiBaseUrl} from "../lib/constants";
import Aside from "../components/layout/aside";

import {Web3ReactProvider, useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
import store from "../lib/store"
import {Provider} from 'react-redux'
import {getLibrary} from "../lib/connectors";
import Pagination from "../components/_pagination"


export const getServerSideProps: GetServerSideProps = async (
  context
) => {

  let data = null
  const page = context.query.page || 1
  try {
    const res = await fetch(`${apiBaseUrl}/api/posts/?page=${page}`)
    data = await res.json()
    if (res.status === 404) {
      return {
        redirect: {
          destination: '404',
          permanent: false,
        }
      }
    }
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data
    },
  }
}

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(data)
  const results = data.results
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0) {
    pageCount += 1
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Layout>
          <div className="container flex justify-between mx-auto">
            <div className="w-full lg:w-8/12">
              {results.map((post: IPost) => (
                <>
                  <Post {...post}/>
                </>
              ))}

              <Pagination pageCount={pageCount}/>

            </div>
            <Aside/>
          </div>
        </Layout>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Home
