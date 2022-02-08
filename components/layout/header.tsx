// import {Fragment} from 'react'
import Link from 'next/link'
import {Disclosure} from '@headlessui/react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPython} from "@fortawesome/free-brands-svg-icons";
// import {faInfo} from "@fortawesome/free-solid-svg-icons";


const classNames = ({classes}: { classes: any[] }) => {
  return classes.filter(Boolean).join(" ")
}

const Header = () => {

  const navigation = [
    {name: '教程', href: '/tutorials/', current: false},
    // {name: '博客', href: '#', current: false},
  ]

  return (
    <Disclosure as="nav" className="sticky top-0 z-30 bg-neutral-800">
      {({open}) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true"/>
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a
                    className="flex-shrink-0 flex items-center text-white hover:bg-neutral-700 px-3 rounded-md font-light">
                    <FontAwesomeIcon icon={faPython} size="2x" className="h-8 w-auto mr-2"/>
                    Python观察员
                  </a>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            {
                              classes:
                                [item.current ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-base font-light']
                            }
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>

                    ))}
                  </div>
                </div>
              </div>
              {/*<div*/}
              {/*  className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"*/}
              {/*>*/}
              {/*  <Link href="/about/">*/}
              {/*    <a title="关于"*/}
              {/*       className="p-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 hover:text-white"*/}
              {/*    >*/}
              {/*      <FontAwesomeIcon icon={faInfo}/>*/}
              {/*      <span className="ml-2">关于</span>*/}
              {/*    </a>*/}
              {/*  </Link>*/}

              {/*</div>*/}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Header;
