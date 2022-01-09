import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {apiBaseUrl} from "../../lib/constants";
import Layout from "../../components/layout/layout";
import {IPost} from "../../components/interface";
import Post from "../../components/post";
import Aside from "../../components/layout/aside";
// import {getLibrary} from "../../lib/connectors";
// import store from "../../lib/store";
import {Web3ReactProvider} from '@web3-react/core'
import store from "../../lib/store"
import {Provider} from 'react-redux'
import {getLibrary} from "../../lib/connectors";


const queryParams = (params: any) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}


export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let data = null
  const params = {
    tags__slug: query.slug
  }
  const url = `${apiBaseUrl}/api/posts/?` + queryParams(params)
  console.log(url)
  try {
    const res = await fetch(url)
    data = await res.json()
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data: data.results
    }
  }
}


const Index = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
      <Layout>
        <div className="container flex justify-between mx-auto">
          <div className="w-full lg:w-8/12">
            {data.map((post: IPost) => (
              <>
                <Post {...post}/>
              </>
            ))}
          </div>
          <Aside/>
        </div>
      </Layout>
      </Provider>
    </Web3ReactProvider>
  )
}


export default Index;
