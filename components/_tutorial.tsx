import {Tutorial} from "./interface";
import Image from 'next/image';
import Link from "next/link";

const Tutorial = (tutorial: Tutorial): JSX.Element => {

  const _cover_url = tutorial.cover_url ? tutorial.cover_url : ""
  console.log(_cover_url)

  return (
    <>
      <div className="h-full border-1 shadow-md rounded-lg overflow-hidden">
        {/*<img className="lg:h-48 md:h-36 w-full object-cover object-center" src={tutorial.cover_url}/>*/}
        <Image className="lg:h-48 md:h-36 w-full object-cover object-center"
               alt={tutorial.title}
               src={_cover_url}
               width={"480"}
               height={"240"}
               layout="responsive"
               priority
        />
        <div className="p-6">
          <Link href={`/tutorials/${tutorial.slug}`}>
            <a title={tutorial.title}>
              <h1 className="text-2l font-bold text-gray-700 hover:underline">
                {tutorial.title}
              </h1>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Tutorial;
