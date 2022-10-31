import { Photo } from "../interface/photo"
import Image from "next/image"
import { rgbDataURL } from "../lib/utils"

const photoCell = (photo: Photo): JSX.Element => {

  return (
    <div className="card card-compact bg-base-200 shadow-xl m-4">
      <figure>
        <Image
          width={"300"}
          height={"200"}
          quality={75}
          src={photo.urls.regular}
          placeholder="blur"
          // blurDataURL={photo.blur_hash}
          blurDataURL={rgbDataURL({ r: 248, g: 248, b: 248 })}
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
