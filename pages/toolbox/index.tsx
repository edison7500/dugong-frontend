import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { apiBaseUrl } from "../../lib/constants"

import { Layout } from "../../components/layout"

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
    revalidate: 10,
  }
}

const toolBox = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  console.info(data)

  return (
    <>
      <Layout></Layout>
    </>
  )
}

export default toolBox
