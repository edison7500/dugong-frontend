import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { Layout } from "../../components/layout"
import { apiBaseUrl } from "../../lib/constants"
import { Tutorial } from "../../interface"
import TutorialCell from "../../components/_tutorial"
import Pagination from "../../components/_pagination"
import { queryParams } from "../../lib/utils"

export const getServerSideProps: GetServerSideProps = async context => {
  let data = null
  const page = context.query.page || 1
  const params = {
    page: page,
    size: 12,
  }
  try {
    const res = await fetch(
      `${apiBaseUrl}/api/tutorials/?${queryParams(params)}`,
    )
    data = await res.json()
    if (res.status === 404) {
      return {
        redirect: {
          destination: "/404",
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

const Tutorials: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const results = data.results
  let pageCount = Math.ceil(data.count / 30)
  if (data.count % 30 > 0 && data.count > 1) {
    pageCount += 1
  }

  return (
    <Layout>
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {results.map((tutotial: Tutorial) => (
            <div className="p-4 md:w-1/3" key={tutotial.slug}>
              <TutorialCell {...tutotial} />
            </div>
          ))}
        </div>

        <Pagination pageCount={pageCount} />
      </div>
    </Layout>
  )
}

export default Tutorials
