import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {apiBaseUrl} from "../../lib/constants";
import Layout from "../../components/layout/layout";
import {IPost} from "../../components/interface";
import Post from "../../components/post";
import Aside from "../../components/layout/aside";
import {Web3ReactProvider} from '@web3-react/core'
// import store from "../../lib/store"
// import {Provider} from 'react-redux'
import {getLibrary} from "../../lib/connectors";
import Pagination from "../../components/_pagination";


const queryParams = (params: any) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}


export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  let data = null
  const page = context.query.page || 1
  const params = {
    tags__slug: context.query.slug,
    page: page,
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
      data
    }
  }
}


const Tag = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const results = data.results
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0 && pageCount > 1) {
    pageCount += 1
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/*<Provider store={store}>*/}
      <Layout>
        <div className="container flex justify-between mx-auto">
          <div className="w-full lg:w-8/12">
            {results.map((post: IPost) => (
              <div className="mt-6" key={post.slug}>
                <Post {...post}/>
              </div>
            ))}

            {pageCount > 1? <Pagination pageCount={pageCount}/>: ""}

          </div>
          <Aside/>
        </div>
      </Layout>
      {/*</Provider>*/}
    </Web3ReactProvider>
  )
}


export default Tag;
