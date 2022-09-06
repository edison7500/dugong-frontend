import { Props } from "../../interface"
import Meta from "../_meta"
import { Header } from "./_header"
import { Footer } from "./_footer"

export const Layout = ({
  children,
  title,
  description,
}: Props): JSX.Element => {
  const _title = title ? title : "Python 观察员"
  return (
    <>
      <Meta title={_title} description={description} />
      <Header />
      <div className="px-6 py-8 bg-base-100">{children}</div>
      <Footer />
    </>
  )
}

// export default Layout
