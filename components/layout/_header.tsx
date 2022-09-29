import Link from "next/link"
import { useEffect } from "react"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPython } from "@fortawesome/free-brands-svg-icons"
import { faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
// import { ChangeEvent} from "react"
import { themeChange } from "theme-change"

const classNames = ({ classes }: { classes: any[] }) => {
  return classes.filter(Boolean).join(" ")
}

const navigation = [
  { name: "教程", href: "/tutorials/", current: false, blank: false },
  {
    name: "ChainList",
    href: "https://chainlist.jiaxin.im",
    current: false,
    blank: true,
  },
  // {name: '博客', href: '#', current: false},
]

export const Header = (): JSX.Element => {
  useEffect(() => {
    themeChange(false)
  }, [])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    themeChange(e.target.checked)
  }

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-blend-darken"
      data-theme="dark">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a className="flex-shrink-0 flex items-center text-white hover:bg-neutral-700 px-3 rounded-md font-light">
                    <FontAwesomeIcon
                      icon={faPython}
                      size="2x"
                      className="h-8 w-auto mr-2"
                    />
                    Python观察员
                  </a>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames({
                            classes: [
                              item.current ? "btn-active" : "",
                              "px-3 py-2 text-base-content btn btn-ghost",
                            ],
                          })}
                          aria-current={item.current ? "page" : undefined}
                          target={item.blank ? "_blank" : "_self"}>
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative text-base-content mx-4 text-xl">
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={handleCheck}
                    />
                    <FontAwesomeIcon
                      icon={faSun}
                      data-set-theme="light"
                      className={"swap-on fill-current w-10 h-10"}
                    />
                    <FontAwesomeIcon
                      icon={faMoon}
                      data-set-theme="dark"
                      className={"swap-off fill-current w-10 h-10"}
                    />
                  </label>
                </div>

                <form
                  action={"/search/"}
                  className="hidden relative mr-3 md:mr-0 md:block text-gray-400">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    id={"search-input"}
                    className="block p-2 pl-10 w-full rounded-full text-gray-800"
                    name="q"
                    type="text"
                    placeholder="Search..."
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

// export default Header
