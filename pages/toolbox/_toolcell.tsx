import Image from "next/image"
import { ITool } from "../../interface"

const ToolCell = (tool: ITool): JSX.Element => {
  const description = `${tool.description?.slice(0, 100)}...`
  return (
    <>
      <div className={"card glass p-4 bg-base-100 shadow-xl"} key={tool.slug}>
        <figure>
          <Image
            src={tool.icon}
            width={64}
            height={64}
            layout="fixed"
            alt={tool.title}
            quality={75}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tool.title}</h2>
          <p className={"font-light text-xs"}>{description}</p>
        </div>
      </div>
    </>
  )
}

export default ToolCell
