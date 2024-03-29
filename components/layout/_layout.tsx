import { Props } from "../../interface"
import Meta from "../_meta"
import { Header } from "./_header"
import { Footer } from "./_footer"
import { AnalyticsWrapper } from "../analytics"

export const Layout = ({
  children,
  title,
  description,
  canonical,
}: Props): JSX.Element => {
  const _title = title ? title : "Python 观察员"
  return (
    <>
      <Meta title={_title} description={description} canonical={canonical} />
      <Header />
      <main className="px-4 py-8 lg:p-8 bg-base-100">{children}</main>
      <Footer />

      <AnalyticsWrapper />
    </>
  )
}

// export default Layout
