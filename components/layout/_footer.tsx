import Link from "next/link"
import Image from "next/image"

export const Footer = () => {
  return (
    <>
      <footer className="footer items-center my-16 px-32 bg-base-100 text-base-content">
        <div className="items-center grid-flow-col">
          <p className="text-md font-semibold">
            <Link href="https://nextjs.org">
              <a target="_blank" className="btn btn-link">
                Power by Next.js.
              </a>
            </Link>
            <span>The source code is licensed GNU. Build nicely.</span>
          </p>
        </div>

        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <Link
            href={
              "https://www.digitalocean.com/?refcode=6536aaf99f81&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
            }>
            <a target={"_blank"} rel="nofollow" className="btn btn-link">
              <Image
                src={
                  "https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg"
                }
                alt="DigitalOcean Referral Badge"
                width={"200"}
                height={"50"}
              />
            </a>
          </Link>
        </div>
      </footer>
    </>
  )
}

// export default Index
