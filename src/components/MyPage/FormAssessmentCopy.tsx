import React, { useEffect, useState } from "react"
import { navigate, Link } from "gatsby"
import SEO from "../SEO/SEO"
import CancelModal from "../Modals/CancelModal"
import { fetchApi, postApi } from "../Common/WebApi-utils"
import { webApi } from "../Security/ApiEndpoints"

const Books = [
  {
    title: "Multi 1A, Lærernes bok",
    ISBN: 9876543212343,
    subTitle: "Undertittel",
    inStorage: true,
    expectedIn: "",
    allreadySent: false,
  },
  {
    title: "Multi 2A",
    ISBN: 9876543212342,
    subTitle: "Undertittel",
    inStorage: true,
    expectedIn: "",
    allreadySent: true,
  },
  {
    title: "Multi 5A, Elevbok",
    ISBN: "9876543212341",
    subTitle: "Undertittel",
    inStorage: false,
    expectedIn: "04.05.21",
    allreadySent: true,
  },
]
const Checked = ({ data }) => {
  const onChange = () => {
    let btnSend = document.getElementById("btnSend")
    const arr = document.getElementsByName("available_book")
    let countChecked = 0

    arr.forEach((element) => {
      element.checked === true ? (countChecked += 1) : null
    })
    countChecked > 0 ? (btnSend.disabled = false) : (btnSend.disabled = true)
  }

  if (data.allreadySent == true) {
    return (
      <input
        id={data.id}
        name="unavailable_book"
        type="checkbox"
        className="form-checkbox h-7 w-7 text-carmine-500 rounded absolute left-1 top-4 disabled:opacity-50"
        checked
        disabled
      />
    )
  } else {
    return (
      <input
        id={data.id}
        name="available_book"
        type="checkbox"
        className="form-checkbox h-7 w-7 text-carmine-500 rounded absolute left-1 top-4 outline-none"
        onChange={onChange}
      />
    )
  }
}

const FormAssessmentCopy = (account) => {
  const [modal, setModal] = useState(false)

  const [materialGroup, setMaterialGroup] = useState([])
  const [books, setBooks] = useState([])
  let orderArray = {
    // accountId: window.sessionStorage.getItem("accountId"),
    materialsID: [],
  }
  const onSend = () => {
    // TODO: check if assessmentCopy or SampleAccess from url param, navigate to the respective page
  }

  useEffect(() => { }, [])
  const onChange = () => {
    let btnSend = document.getElementById("btnSend")
    const arr = document.getElementsByName("available_book")
    let countChecked = 0

    arr.forEach((element) => {
      element.checked === true ? (countChecked += 1) : null
    })
    countChecked > 0 ? (btnSend.disabled = false) : (btnSend.disabled = true)
  }

  useEffect(() => {
    const materialGroupId = window.sessionStorage.getItem("groupId")
    fetchApi(webApi + "/GyldendalMaterialGroup/" + materialGroupId)
      .then((response) => {
        console.log(response)
        setMaterialGroup(response.data)
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
      })
      .finally(function () {
        // always executed
      })
  }, [])

  const createOrderArray = () => {
    // orderArray = {}
    var availableBooks = Array.prototype.slice.call(document.getElementsByName("available_book"))

    availableBooks.map((book) => {
      if (book.checked === true) {
        orderArray.materialsID.push(book.id)
      }
    })
    console.log(orderArray)
    postApi(webApi + "/GyldendalOrders/makeOrder", orderArray).then((response) =>
      window.sessionStorage.setItem("orderId", response.data)
    )

    navigate("/minside/ordre")
  }

  return (
    <>
      {/* Header tag from */}
      {/* Main here */}
      <div className="flex pt-10 bg-white">
        <SEO title="Bestilling" description="Gyldendal sin hjem side." />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 m-auto sm:p-2 bg-white">
          <div className="bg-white sm:p-2">
            <div>
              <h2 className="text-3xl font-bold pb-3">Forespørsel om vurderingseksemplar av Multi</h2>
              <h5 className="text-md">
                Vi gjør oppmerksom på at det kun sendes et begrenset antall vurderingseksemplarer til hver skole. Har du
                spørsmål, kontakt oss på{" "}
                <a href={"mailto:" + "Vurdeks@gyldendal.no"} className="underline">
                  e-post
                </a>{" "}
              </h5>
            </div>
            <div className="pt-10">
              <h3 className="font-semibold">Velg vurderingseksemplar</h3>
              <div className="max-w-full">
                {materialGroup.map((book) => (
                  <div className="relative flex justify-between border-b p-3">
                    <div className="flex space-x-2">
                      <div className="inline-flex items-center mt-3 box-shadow-none">
                        {book.allreadySent ? (
                          <input
                            id={book.id}
                            name="unavailable_book"
                            type="checkbox"
                            className="form-checkbox h-7 w-7 text-carmine-500 rounded absolute left-1 top-4 disabled:opacity-50"
                            checked
                            disabled
                          />
                        ) : (
                          <input
                            id={book.id}
                            name="available_book"
                            type="checkbox"
                            className="form-checkbox h-7 w-7 text-carmine-500 rounded absolute left-1 top-4 outline-none"
                            onChange={onChange}
                          />
                        )}
                      </div>
                      <div>
                        <label htmlFor="settings-option-0" className="ml-3 flex flex-col cursor-pointer pl-5">
                          <span className="block font-semibold text-md ">{book.name}</span>
                          <span className="block text-sm">{book.name}</span>
                          <span className="block text-sm text-gray pt-4 text-gray-400">ISBN: {book.iSBN}</span>

                          {/* 
                            TODO!!! Change this to field from API
                            {data.allreadySent ? (
                              <span className="block text-sm text-gray pt-2 text-gray-400">
                                *Din skole ha allerede mottatt flere eksemplarer av denne boken
                              </span>
                            ) : null} */}
                        </label>
                      </div>
                    </div>
                    <div className="justify-end text-right">
                      <span className="text-sm text-right">
                        {book.name ? "På lager" : "Kommer på lager " + book.iSBN}
                      </span>
                      <p className="text-sm pt-4 text-right break-words">Forventet levering 5-10 virkedager</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {modal ? <CancelModal proceed={() => setModal(false)} /> : null}

            <div className="flex justify-start justify-end">
              <button
                onClick={() => setModal(true)}
                className="h-10 m-2 underline bg-transparent text-black font-semibold hover:text-gray py-2 px-6 borde-none"
              >
                Abryt
              </button>
              {/* <Link to="/minside/ordre"> */}
              <button
                id="btnSend"
                // disabled
                onClick={createOrderArray}
                className="h-10 m-2 bg-carmine-500 hover:bg-carmine-800 text-white font-semibold hover:text-white py-2 px-6 border border-red-500 rounded disabled:opacity-50"
              >
                Send
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormAssessmentCopy
