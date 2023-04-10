import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { apiBaseUrl } from "../../lib/constants"
import { Layout, Asider } from "../../components/layout"
import { IPost } from "../../interface"
import { queryParams } from "../../lib/utils"
import Post from "../../components/post"
import Pagination from "../../components/_pagination"
import { useState } from "react"

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
  const [pageCount, setPageCount] = useState(Math.ceil(data.count / 30))
  if (data.count % 30 > 0 && pageCount > 1) {
    setPageCount(pageCount + 1)
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

          {pageCount > 1 ? <Pagination pageCount={pageCount} /> : ""}
        </div>
        <Asider />
      </div>
    </Layout>
  )
}

export default Tag
