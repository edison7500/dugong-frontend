import Link from "next/link"

const Index = () => {
  return (
    <>
      <footer className="footer footer-center mt-20 p-4 bg-base-100 text-base-content">
        <div className="sm:w-2/3 text-center py-6">
          <p className="text-md font-semibold">
            <Link href="https://nextjs.org">
              <a target="_blank" className="btn btn-link">
                Power by Next.js.
              </a>
            </Link>
            <span>The source code is licensed GNU. Build nicely.</span>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Index
