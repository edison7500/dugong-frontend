import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import Layout from '../components/layout/layout'

const Index = () => {
  return (
    <Layout title={`Page Not Found | Python 观察员`}>
      <main id="content" role="main">
        <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 class="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
            404
          </h1>
          {/*<h1 class="block text-2xl font-bold text-white"></h1>*/}
          <p class="mt-3 text-gray-600 dark:text-gray-400">
            Oops, something went wrong.
          </p>
          <p class="text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find your page.
          </p>
          <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
            <Link href={`/`}>
              <a
                class="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent
             font-semibold text-blue-500 hover:text-blue-700 
             focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 
             transition-all text-sm py-3 px-4 dark:ring-offset-slate-900">
                <FontAwesomeIcon icon={faAngleLeft} />
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Index
