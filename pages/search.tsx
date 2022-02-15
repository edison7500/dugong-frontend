import Layout from "../components/layout/layout";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {apiBaseUrl} from "../lib/constants";
import {queryParams} from "../lib/utils";
import {IPost} from "../components/interface";
import Post from "../components/post";
import Pagination from "../components/_pagination";

export const getServerSideProps: GetServerSideProps = async (context) => {

  let data = null
  let pageCount = 0
  const page = context.query.page || 1
  const q = context.query.q
  const params = {
    page: page,
    q: q
  }

  try {
    const res = await fetch(`${apiBaseUrl}/api/posts/?${queryParams(params)}`)
    data = await res.json()

    pageCount = Math.ceil(data.count / 30)
    if (data.count % 30 > 0 && pageCount > 1) {
      pageCount += 1
    }

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
      results: data.results,
      pageCount: pageCount,
      q: q,
    }
  }
}

const Search: NextPage = (data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const results = data.results
  const q = data.q
  const pageCount = data.pageCount

  console.log(pageCount)

  return (
    <Layout title={q}>
      <div className="container flex justify-center mx-auto">
        <div className="w-full lg:w-8/12">

          {results.map((post: IPost) => (
            <div className="mt-6" key={post.slug}>
              <Post {...post}/>
            </div>
          ))}

          {pageCount > 1 ? <Pagination pageCount={pageCount}/> : ""}

        </div>
      </div>
    </Layout>
  )
}

export default Search;
