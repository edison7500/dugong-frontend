import { Layout } from "../components/layout"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { apiBaseUrl } from "../lib/constants"
import { queryParams } from "../lib/utils"
import { IPost } from "../interface"
import Post from "../components/post"
import Pagination from "../components/_pagination"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps = async context => {
  let data = null
  let pageCount = 0
  const page = context.query.page || 1
  const q = context.query.q || null
  const params = {
    page: page,
    q: q,
  }

  try {
    const res = await fetch(`${apiBaseUrl}/api/posts/?${queryParams(params)}`)
    data = await res.json()

    pageCount = Math.ceil(data.count / 30)
    if (data.count % 30 > 0 && pageCount > 1) pageCount += 1

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
      results: data.results,
      count: data.count,
      pageCount: pageCount,
      q: q,
    },
  }
}

const Search: NextPage = (
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const results = data.results
  const [query, setQuery] = useState(data.q)
  const pageCount = data.pageCount

  return (
    <Layout title={`${query} | Python 观察员`}>
      <div className="container flex justify-center mx-auto">
        <div className="w-full lg:w-8/12">
          <form
            className="form-control max-w-2xl mx-auto mb-10 mt-20"
            action={"/search/"}
            method={`GET`}>
            <label className="input-group input-group-lg">
              <input
                className="w-full input input-bordered"
                placeholder={"Search..."}
                name="q"
                value={query}
                onInput={e => {
                  // @ts-ignore
                  setQuery(e.target.value)
                }}
              />
              <button type="submit" className="btn btn-square">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </label>
          </form>

          {results.map((post: IPost) => (
            <div key={post.slug}>
              <Post {...post} />
            </div>
          ))}

          {pageCount > 1 ? <Pagination pageCount={pageCount} /> : ""}
        </div>
      </div>
    </Layout>
  )
}

export default Search
