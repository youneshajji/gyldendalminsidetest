import React from "react"
import { Link } from "gatsby"
const LoadingModal = () => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          {" "}
          &#8203;{" "}
        </span>
        <div className="inline-block align-middle transform transition-all animate-pulse">
          <div className="inline-block rounded-full border-white border-8 transform transition-all h-52 w-52"></div>
          <p className="text-white text-md pt-4">Vennligst vent </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingModal
