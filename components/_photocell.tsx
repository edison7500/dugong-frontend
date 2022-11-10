import { Photo } from "../interface/photo"
import Image from "next/image"
import Link from "next/link"
import { rgbDataURL } from "../lib/utils"

const photoCell = (photo: Photo): JSX.Element => {
  console.log(photo)
  return (
    <div className="card card-compact bg-base-200 shadow-xl m-4">
      <figure className="mt-4 mb-4">
        <Image
          width={"300"}
          height={"200"}
          quality={75}
          src={photo.urls.regular}
          placeholder="blur"
          blurDataURL={photo.blur_hash}
          // blurDataURL={rgbDataURL({ r: 248, g: 248, b: 248 })}
          priority
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-between">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <Image
                src={photo.user.profile_image.medium}
                width={64}
                height={64}
                placeholder="blur"
                blurDataURL={rgbDataURL({ r: 248, g: 248, b: 248 })}
                priority
                alt={photo.user.name}
              />
            </div>
          </div>

          <div>
          <Link href={`${photo.links.html}?utm_source=dugong&utm_medium=referral`}>
            <a className="btn btn-xs btn-outline" target={"_blank"}>
            Unslpash
            </a>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default photoCell
