import Github from "../_github"

export const Asider = (): JSX.Element => {
  return (
    <div className="hidden w-4/12 -mx-8 lg:block">
      <div className="px-4 mt-6">
        <Github />
      </div>
    </div>
  )
}

export default Asider
