import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { ITool } from "../interface"
import { rgbDataURL } from "../lib/utils"

const ToolCell = (tool: ITool): JSX.Element => {
  const description = `${tool.description?.slice(0, 100)}...`
  return (
    <>
      <div className={"card glass bg-base-100 shadow-xl"} key={tool.slug}>
        <figure className="py-4">
          <Image
            src={tool.icon}
            width={64}
            height={64}
            layout="fixed"
            alt={tool.title}
            quality={75}
            placeholder="blur"
            blurDataURL={rgbDataURL({ r: 111, g: 111, b: 111 })}
            priority
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tool.title}</h2>
          <p className={"font-light text-xs"}>{description}</p>

          <div className="card-actions justify-end">
            <Link href={tool.url}>
              <a
                className={"font-link text-xs link link-hover"}
                target={"_blank"}
                title={tool.title}
                rel={"noreferrer"}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToolCell
