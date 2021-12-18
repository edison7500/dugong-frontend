import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import Layout from "../components/layout/layout";
import {IPost} from "../components/interface";
import Post from "../components/post";
import {apiBaseUrl} from "../lib/constants";

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

  return (
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

      </div>
    </Layout>
  )
}

export default Home
