import {Photo} from "../interface/photo"
import Image from "next/image"


const photoCell = (photo: Photo): JSX.Element => {
  // console.log(photo);

  return (
  <div className="h-full border-1 shadow-md rounded-lg overflow-hidden">
    <Image 
    // className="lg:h-48 md:h-36 w-full object-cover object-center"
    // layout="responsive"
          width={"480"}
          height={"240"}
          quality={75} 
          src={photo.urls.regular}
           />
  </div>
  )
}

export default photoCell;