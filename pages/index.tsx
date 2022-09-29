import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next"
import dynamic from "next/dynamic"
import { apiBaseUrl } from "../lib/constants"
import { Layout } from "../components/layout"
import { IPost } from "../interface"
import Post from "../components/post"
import Pagination from "../components/_pagination"

const Asider = dynamic(() => import("../components/layout/_aside"), {
  suspense: true,
})

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=59",
  )

  let data = null
  const page = context.query.page || 1
  try {
    const res = await fetch(`${apiBaseUrl}/api/posts/?page=${page}`)
    data = await res.json()
    if (res.status === 404) {
      return {
        redirect: {
          destination: "404",
          permanent: false,
        },
      }
    }
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data,
    },
  }
}

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const results = data.results
  const next = data.next
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0) {
    pageCount += 1
  }

  return (
    <Layout>
      <div className="container flex justify-between mx-auto">
        <div className="w-full lg:w-8/12">
          {results.map((post: IPost) => (
            <div key={post.slug}>
              <Post {...post} />
            </div>
          ))}

          {next ? <Pagination pageCount={pageCount} /> : null}
        </div>

        <Asider />
      </div>
    </Layout>
  )
}

export default Home
