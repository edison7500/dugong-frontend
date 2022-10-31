import { Photo } from "../interface/photo"
import Image from "next/image"

const photoCell = (photo: Photo): JSX.Element => {
  // console.log(photo);

  return (
    <div className="card card-compact bg-base-200 shadow-xl m-4">
      <figure>
        <Image
          width={"300"}
          height={"200"}
          quality={75}
          src={photo.urls.regular}
          placeholder="blur"
          blurDataURL={photo.blur_hash}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </figure>
    </div>
  )
}

export default photoCell
