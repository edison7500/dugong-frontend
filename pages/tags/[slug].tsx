import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { apiBaseUrl } from '../../lib/constants'
import Layout from '../../components/layout/layout'
import { IPost } from '../../interface'
import Post from '../../components/post'
import Aside from '../../components/layout/aside'
import { queryParams } from '../../lib/utils'
import Pagination from '../../components/_pagination'

export const getServerSideProps: GetServerSideProps = async context => {
  let data = null
  const page = context.query.page || 1
  const params = {
    tags__slug: context.query.slug,
    page: page,
  }
  const url = `${apiBaseUrl}/api/posts/?` + queryParams(params)
  try {
    const res = await fetch(url)
    data = await res.json()
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data,
    },
  }
}

const Tag = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const results = data.results
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0 && pageCount > 1) {
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

          {pageCount > 1 ? <Pagination pageCount={pageCount} /> : ''}
        </div>
        <Aside />
      </div>
    </Layout>
  )
}

export default Tag
