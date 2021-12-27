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

  const res = await fetch(`${apiBaseUrl}/api/posts/`)
  const data = await res.json()

  return {
    props: {
      data: data.results
    },
  }
}

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const context = useWeb3React<Web3Provider>()
  // console.log(context)
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

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
