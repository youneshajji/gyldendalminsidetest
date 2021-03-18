import { strictEqual } from "assert"
import React, { useMemo, useState } from "react"
import Footer from "../Footers/Footer"
import MainNavBar from "../Navbars/MainNavBar"
//import MainHeader from "../Headers/MainHeader"
import { UserContext } from "../Security/UserContext"
import Header from "../Headers/Header"

// See https://jsdoc.app/ for valid jsdoc/tsdoc values

/**
 * This component is the main layout for the entire site
 *
 * @name Layout
 *
 *  @remarks
 * This method is part of the {@link prosesspilotne.gyldendal#Footer | Footer components
 *
 * @param {[]} children
 * @returns {[]} returns an array representing the difference between the two arrays
 * @example
 *  <Layout> <p>Hellow World </p></Layout>
 *
 * @author Frode Stenstrøm <frode.stenstrom@prosesspilotene.no>
 *
 * @beta
 *
 *
 */

// import CoockieConsentBanner from "../GDPR/CoockieConsentBanner"

// This component is the main layout for the entire site

export default function Layout({ children }) {
  const [user, setUser] = useState("")
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <UserContext.Provider value={providerValue}>
      <div className="bg-betong-100">
        {/* Nav from navbar */}
        <Header />

        {/* Header is called from page components. THis is mostly the hero components */}
        {/* main is called from page compents */}
        {/* CTA and footer is called here */}

        {/* <header className="bg-white shadow"></header> */}
        {/* <main> */}
        {/* <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> */}
        {/* Replace with your content */}
        {/* <div className="px-4 py-6 sm:px-0"> */}
        <div>{children}</div>
        {/* </div> */}
        {/* End replace  */}
        {/* </div> */}
        {/* </main> */}
      </div>
    </UserContext.Provider>
  )
}
