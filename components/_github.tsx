import { memo } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const Github = () => {
  const repos = [
    "dugong",
    "django-leancloud-sms",
    "flask-oss",
    "django-sendcloud",
  ]

  return (
    <div className="flex justify-center">
      <div className="w-96 rounded-lg border border-base-300 text-base-content">
        <div
          className="block px-6 py-2
                w-full
                rounded-t-lg
                bg-base-300
                text-base-content
                cursor-pointer">
          <h3 className="font-bold">GitHub</h3>
        </div>
        {repos.map(r => (
          <div
            className="block px-6 py-2 border-b border-gray-400
                bg-base-100
                w-full
                transition
                cursor-pointer"
            key={r}>
            <Link href={`https://github.com/edison7500/${r}`}>
              <a
                className={"font-extralight link link-hover"}
                target="_blank"
                rel="noreferrer"
                title={r}>
                <FontAwesomeIcon icon={faGithub} />
                <span className="ml-2">{r}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Github)
