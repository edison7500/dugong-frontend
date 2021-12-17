import Link from 'next/link'


const Index = () => {
  return (
    <>
      <footer className="relative pt-1 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="mt-4 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
              <p className="text-sm text-gray-700 font mb-2">
                <Link href="https://nextjs.org">
                  <a className="pr-2 hover:underline">Power by Next.js.</a>
                </Link>
                <span>The source code is licensed GNU. Build nicely.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Index;
