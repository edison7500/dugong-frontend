import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import Layout from "../components/layout/layout";
import {IPost} from "../components/interface";
import Post from "../components/post";
import {apiBaseUrl} from "../lib/constants";
import Aside from "../components/layout/aside";

import {Web3ReactProvider, useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
import {Web3Provider} from "@ethersproject/providers";

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const getServerSideProps: GetServerSideProps = async (
  context
) => {

  let data = null
  try {
    const res = await fetch(`${apiBaseUrl}/api/posts/`)
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
      data: data.results
    },
  }
}

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <div className="container flex justify-between mx-auto">
          <div className="w-full lg:w-8/12">
            {/*<div className="columns-2">*/}
            {data.map((post: IPost) => (
              <>
                <Post {...post}/>
              </>
            ))}
          </div>
          <Aside/>
        </div>
      </Layout>
    </Web3ReactProvider>
  )
}

export default Home
