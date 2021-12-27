import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const Index = () => {
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
        <div className="block px-6 py-2 border-b border-gray-400
                w-full
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                transition
                cursor-pointer">
          <a href="https://github.com/edison7500/dugong">
            <FontAwesomeIcon icon={faGithub}/><span className="ml-2">dugong</span>
          </a>
        </div>
        <div className="block px-6 py-2 border-b border-gray-400
                w-full
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                transition
                cursor-pointer">
          <a href="https://github.com/edison7500/django-leancloud-sms">
            <FontAwesomeIcon icon={faGithub}/><span className="ml-2">django-leancloud-sms</span>
          </a>
        </div>
        <div className="block px-6 py-2 border-b border-gray-400
                w-full
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                transition
                cursor-pointer">
          <a href="https://github.com/edison7500/flask-oss">
            <FontAwesomeIcon icon={faGithub}/><span className="ml-2">flask-oss</span>
          </a>
        </div>
        <div className="block px-6 py-2 border-b border-gray-400
                w-full
                rounded-b-lg
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                transition
                cursor-pointer">
          <a href="https://github.com/edison7500/django-sendcloud">
            <FontAwesomeIcon icon={faGithub}/><span className="ml-2">django-sendcloud</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Index;
