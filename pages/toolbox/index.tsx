import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { apiBaseUrl } from "../../lib/constants"
import { Layout } from "../../components/layout"
import ToolCell from "../../components/_toolcell"
import { ITool } from "../../interface"
import { queryParams } from "../../lib/utils"
import Pagination from "../../components/_pagination"

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59",
  )

  let data = null
  const page = context.query.page || 1
  const params = {
    page: page,
    size: 18,
  }

  const url = `${apiBaseUrl}/api/toolboxes/?${queryParams(params)}`

  const res = await fetch(url)
  data = await res.json()

  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
  }
}

const toolBox = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const results = data.results
  const previous = data.previous
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0) {
    pageCount += 1
  }

  return (
    <>
      <Layout title={"ToolBox | Python观察员"}>
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-4 gap-4 py-4">
            {results.map((tool: ITool) => (
              <div key={tool.slug}>
                <ToolCell {...tool} />
              </div>
            ))}
          </div>

          {previous ? (
            <div className="my-4">
              <Pagination pageCount={pageCount} />
            </div>
          ) : null}
        </div>
      </Layout>
    </>
  )
}

export default toolBox
