import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { apiBaseUrl } from "../../lib/constants"
import { Layout } from "../../components/layout"
import ToolCell from "../../components/_toolcell"
import { ITool } from "../../interface"

export const getServerSideProps: GetServerSideProps = async context => {
  let data = null
  const url = `${apiBaseUrl}/api/toolboxes/`

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
  // console.info(data)
  const results = data.results
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0) {
    pageCount += 1
  }

  return (
    <>
      <Layout title={"ToolBox | Python观察员"}>
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-4 gap-4">
            {results.map((tool: ITool) => (
              <div key={tool.slug}>
                <ToolCell {...tool} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default toolBox
