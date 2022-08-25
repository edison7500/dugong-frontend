import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"

interface Page {
  pageCount: number
  marginPagesDisplayed?: number | undefined
  pageRangeDisplayed?: number | undefined
}

const Pagination = ({
  pageCount,
  marginPagesDisplayed,
  pageRangeDisplayed,
}: Page) => {
  const router = useRouter()
  const currPage = Number(router.query.page) || 1
  //
  // const encodeGetParams = (p: any) =>
  //   // @ts-ignore
  //   Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

  // Triggers fetch for new page
  const handlePagination = (page: any) => {
    const path = router.pathname
    const query = router.query
    query.page = page.selected + 1
    router.push({
      pathname: path,
      query: query,
    })
  }

  return (
    <nav
      className={
        "container flex flex-row justify-center items-center mx-auto my-6"
      }
      aria-label="Page navigation">
      <ReactPaginate
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        breakClassName={
          "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
        }
        className={"inline-flex -space-x-px"}
        pageClassName={
          "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:underline"
        }
        // pageLinkClassName={""}
        activeClassName={
          "py-2 px-3 text-gray-500 bg-gray-200 cursor-not-allowed disabled:opacity-50"
        }
        // activeLinkClassName={"hover:bg-gray-200 hover:text-gray-500 "}
        previousClassName={
          "py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        }
        nextClassName={
          "py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        }
        pageCount={pageCount}
        // initialPage={currPage - 1}
        hrefBuilder={(page, pageCount, selected) => {
          return page >= 1 && page <= pageCount
            ? `${router.pathname}?page=${page}`
            : "#"
        }}
        hrefAllControls={true}
        forcePage={currPage - 1}
        onPageChange={handlePagination}
      />
    </nav>
  )
}

export default Pagination
