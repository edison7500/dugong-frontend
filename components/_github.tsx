import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const Index = () => {
  const repos = [
    "dugong",
    "django-leancloud-sms",
    "flask-oss",
    "django-sendcloud",
  ]

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
        <div className="block px-6 py-2 border-b border-gray-400
                w-full
                rounded-t-lg
                bg-gray-400
                text-white
                cursor-pointer">
          <h3 className="font-bold">GitHub</h3>
        </div>
        {
          repos.map((r) => (
            <>
              <div className="block px-6 py-2 border-b border-gray-400
                w-full
                hover:underline
                focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                transition
                cursor-pointer">
                <a href={`https://github.com/edison7500/${r}`} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub}/><span className="ml-2">{r}</span>
                </a>
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Index;
