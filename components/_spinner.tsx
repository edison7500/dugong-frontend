// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Spinner = (): JSX.Element => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div
          className={
            "border-4 border-slate-200 border-t-lime-600 h-12 w-12 rounded-full animate-spin"
          }></div>
      </div>
    </>
  )
}

export default Spinner
