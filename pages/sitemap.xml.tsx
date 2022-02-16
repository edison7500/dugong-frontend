import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {},
  }
}

const Sitemap: NextPage = (
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return <></>
}

export default Sitemap
