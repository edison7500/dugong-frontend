import Head from "next/head"
import { MetaProps } from "../interface"
import { NextSeo } from "next-seo"

const Meta = ({ title, description, canonical }: MetaProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="index, follow" name="robots" />
        <meta
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          name="viewport"
        />
        {canonical ? <link rel={"canonical"} href={canonical} /> : null}
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="black" name="apple-mobile-web-app-status-bar-style" />
        <title>{title}</title>
      </Head>
      <NextSeo title={title} description={description} />
    </>
  )
}

export default Meta
