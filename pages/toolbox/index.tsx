import { GetServerSideProps, InferGetServerSidePropsType } from "next"
// import Link from "next/link"
import Image from "next/image"
import { apiBaseUrl } from "../../lib/constants"

import { Layout } from "../../components/layout"
import { ITool } from "../../interface"
import ToolCell from "./_toolcell"

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
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {results.map((tool: ITool) => (
              <>
                <ToolCell {...tool} />
              </>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default toolBox
