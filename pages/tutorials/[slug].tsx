import Layout from "../../components/layout/layout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {apiBaseUrl} from "../../lib/constants";
import {Tutorial} from "../../components/interface";


export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;

  const url = `${apiBaseUrl}/api/tutorials/${context.query.slug}/`

  try {
    const [res] = await Promise.all([fetch(url)])
    if (res.status === 404) {
      return {
        redirect: {
          destination: '404',
          permanent: false,
        },
      }
    }
    [data] = await Promise.all([res.json()])
  } catch (err: any) {
    throw new Error(err)
  }

  return {
    props: {
      data,
    }
  }

}


const Index = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  // console.log(tutorial)
  console.log(data)

  return (
    <Layout title={data.title}>
      <div className="container flex justify-center mx-auto">
        <div className="bg-white shrink w-8/12 py-6 px-8 rounded-lg shadow-md">
          <h1>{data.title}</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Index;
