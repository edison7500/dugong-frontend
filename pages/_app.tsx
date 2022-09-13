import { config } from "@fortawesome/fontawesome-svg-core"
import "../styles/globals.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
// import Script from "next/script"
import Router from "next/router"
// @ts-ignore
import withGA from "next-ga"

import type { AppProps } from "next/app"

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/*// Global Site Tag (gtag.js) - Google Analytics*/}
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      /> */}

      <Component {...pageProps} />
    </>
  )
}

export default withGA(process.env.NEXT_PUBLIC_GA_ID, Router)(MyApp)
