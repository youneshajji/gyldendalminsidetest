import React, { useContext, useEffect, useState, useMemo } from "react"
import { Transition } from "@headlessui/react"
import { UserContext, userInfo } from "../Security/UserContext"
import { LinkItemUserSettingsDesktop } from "../Navbars/NavLinks"
import LogoHeader from "../../images/GyldendalLogo1.svg"
import { Link } from "gatsby"

const Header = () => {
  // const { user, setUser } = useContext(UserContext)
  // const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)

  return (
    <>
      <nav className="bg-betong-300 flex">
        <div className="max-w-7xl px-4 sm:px-2 lg:px-8 relative flex items-center justify-left h-16">
          <div className="flex justify-between ">
            <a href="https://gyldendal.no">
              <img className="h-8" src={LogoHeader} alt="Gyldendal" />
            </a>
          </div>
        </div>
        <div className="w-full px-4 sm:px-2 lg:px-8 relative flex justify-end">
          <div className="relative items-center flex justify-end ">
            <p id="headerName" className="text-md"></p>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
