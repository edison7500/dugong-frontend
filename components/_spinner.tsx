import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Spinner = (): JSX.Element => {
  return (
    <>
      <span className="h-screen w-full flex justify-center items-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className={"fa-spin fa-2xl opacity-75 relative flex text-neutral"}
        />
      </span>
    </>
  )
}

export default Spinner
