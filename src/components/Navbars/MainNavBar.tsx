import React, { useContext, useEffect, useState } from "react"
import { Transition } from "@headlessui/react"
import { graphql, StaticQuery, Link } from "gatsby"
import { UserContext, userInfo } from "../Security/UserContext"
import { connectAutoComplete } from "react-instantsearch-dom"
import { LinkItemMainNavBarDesktop, LinkItemUserSettingsDesktop, LinkItemUserSettingsMobile } from "./NavLinks"

type LinkProps = {
  url: string
  title: string
}

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <ul>
    <li>
      <input type="search" value={currentRefinement} onChange={(event) => refine(event.currentTarget.value)} />
    </li>
    {hits.map((hit) => (
      <li key={hit.objectID}>{hit.name}</li>
    ))}
  </ul>
)

const CustomAutocomplete = connectAutoComplete(Autocomplete)

export default function MainNavBar() {
  // Toggle menu open, closed for settings menu
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    setUser(userInfo())
  }, [])

  return (
    <>
      <nav className="relative bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 bg-betong-500">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center px-2 lg:px-0">
              <div className="flex-shrink-0">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Gyldendal"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Gyldendal"
                />
              </div>
              <div className="hidden lg:block lg:ml-6">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <Link
                    to="/minside/Dashboard"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <LinkItemMainNavBarDesktop url="/minside/" title="MinSide" />
                </div>
              </div>
            </div>
            {/* Search feature */}
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Søk
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Heroicon name: search */}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                    placeholder="Søk..."
                    type="search"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Åpne hovedmeny</span>
                {/* TODO Icon when menu is closed. 
                 Heroicon name: menu
                 Menu open: "hidden", Menu closed: "block" */}

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Heroicon name: x
                    Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="hidden lg:block lg:ml-4">
              {/* Inbox link and notification */}
              <div className="flex items-center">
                <button className="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Se varsler og meldinger</span>
                  {/* Heroicon name: bell */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                {/* Profile dropdown  */}
                <div className="z-50 ml-4 relative flex-shrink-0">
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                      className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Åpne Min Side</span>
                      <strong className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                        {user.isLoggedInn && user.name !== "" ? "Hei " + user.name : "MinSide"}
                      </strong>
                    </button>
                  </div>

                  {/* Profile dropdown panel, show/hide based on dropdown state. */}
                  <Transition
                    show={isSettingsMenuOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {(ref) => (
                      <div
                        ref={ref}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        {user.isLoggedInn && user.name !== "" ? (
                          <div>
                            <LinkItemUserSettingsDesktop url="/minside/innstillinger/brukerprofil" title="Profil" />
                            {/* <LinkItemUserSettingsDesktop url="/minside/innstillinger/brukerprofil" title="Innstillinger" /> */}
                            <LinkItemUserSettingsDesktop
                              url="/minside/innstillinger/byttpassord"
                              title="Bytt passord"
                            />
                            <LinkItemUserSettingsDesktop url="/minside/innstillinger/Logout" title="Logg ut" />
                          </div>
                        ) : (
                          <div>
                            <LinkItemUserSettingsDesktop url="/minside/logginn" title="Login" />
                            <LinkItemUserSettingsDesktop url="/minside/nybruker" title="Registrer deg" />
                            <LinkItemUserSettingsDesktop url="/minside/glemtpassord" title="Glemt passord" />
                          </div>
                        )}
                      </div>
                    )}
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
        
        TODO: Legg til knapp for å sette status på menyene.

        Mobile menu, toggle classes based on menu state.
        Open: "block", closed: "hidden" 
        
        */}
        <div className="flex lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link
              to="/minside/Dashboard"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/produktgrupper"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {" "}
              ProduktGrupper
            </Link>
            <Link
              to="/artikkel"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {" "}
              Artikler
            </Link>
            <Link
              to="/bonde"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Bonde
            </Link>
            <Link
              to="/prosjekt"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Prosjekt
            </Link>
            <Link
              to="/kategori"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Kategori
            </Link>

            <Link
              to="/minside/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              MinSide
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0"></div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {user.isLoggedInn ? user.name : "MinSide"}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {user.isLoggedInn ? user.email : "MinSide"}
                </div>
              </div>
              <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                {/* Heroicon name: bell */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {user.isLoggedInn ? (
                <div>
                  <LinkItemUserSettingsMobile url="/minside/profile/UserProfile" title="Min Profil" />
                  <LinkItemUserSettingsMobile url="/minside/profile/Settings" title="Mine instillinger" />
                  <LinkItemUserSettingsMobile url="/minside/Logout" title="Logg ut" />
                </div>
              ) : (
                <div>
                  <LinkItemUserSettingsMobile url="minside/loginn" title="Login" />
                  <LinkItemUserSettingsMobile url="/minside/unauthenticated/SignUp" title="Registrer deg" />
                  <LinkItemUserSettingsMobile url="/minside/unauthenticated/ForgottenPassword" title="Glemt passord" />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
