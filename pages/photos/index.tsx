import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { Layout } from "../../components/layout"
import { unsplashAccessKey } from "../../lib/constants"
import { queryParams } from "../../lib/utils"
import PhotoCell from "../../components/_photocell"
import { Photo } from "../../interface/photo"

export const getServerSideProps: GetServerSideProps = async context => {
  let data = null

  const unsplashUrl = "https://api.unsplash.com/users/truth6474/photos"

  const params = {
    client_id: unsplashAccessKey,
  }

  try {
    const res = await fetch(`${unsplashUrl}?${queryParams(params)}`)
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

const Photos: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const _data = data

  return (
    <Layout>
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {_data.map((photo: Photo) => (
            <div className="md:w-1/4" key={photo.id}>
              <PhotoCell {...photo} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Photos
