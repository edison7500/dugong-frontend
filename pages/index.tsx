import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
// import ReactPaginate from 'react-paginate';
import Layout from '../components/layout/layout'
import { IPost } from '../components/interface'
import { apiBaseUrl } from '../lib/constants'
import Aside from '../components/layout/aside'
import Post from '../components/post'
import Pagination from '../components/_pagination'

export const getServerSideProps: GetServerSideProps = async context => {
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
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0) {
    pageCount += 1
  }

  return (
    <Layout>
      <div className="container flex justify-between mx-auto">
        <div className="w-full lg:w-8/12">
          {results.map((post: IPost) => (
            <div className="mt-6" key={post.slug}>
              <Post {...post} />
            </div>
          ))}
          <Pagination pageCount={pageCount} />
        </div>

        <Aside />
      </div>
    </Layout>
  )
}

export default Home
