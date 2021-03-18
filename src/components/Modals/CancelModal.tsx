import React from "react"
import { Link } from "gatsby"

const CancelModal = ({ proceed }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* 
    <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
        <div
          className="inline-block align-bottom bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={proceed}
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              {/* <!-- Heroicon name: outline/x --> */}
              <svg
                className="h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center ">
            <div className="justify-center pt-10">
              <h3 className="text-md font-medium text-gray-900 pb-10" id="modal-headline">
                Er du sikker på at du vil avbryte din forespørsel?
              </h3>
              <div className="py-4 px-4 space-y-4">
                <button
                  onClick={proceed}
                  className="h-10 w-full px-4 bg-carmine-500 hover:bg-carmine-800 text-white font-semibold hover:text-white border border-carmine-500 rounded"
                >
                  Nei, fortsett
                </button>

                <button className="h-10 w-full border-black border-2 hover:bg-carmine-200 hover:text-carmine-800 text-black font-semibold rounded">
                  Avbryt
                </button>
                <Link to="https://www.gyldendal.no/"></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CancelModal
