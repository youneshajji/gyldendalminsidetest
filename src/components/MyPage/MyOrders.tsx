import React, { useEffect, useState } from "react"
import { fetchApi } from "../Common/WebApi-utils"
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
    allreadySent: false,
  },
]

const MyOrdersData = ({ title, subTitle, isbn, expectedIn, inStorage }) => {
  return (
    <li>
      <div className="relative pb-4 border-b space-y-4">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3 justify-between">
          <div>
            <span className="block font-semibold text-md">{title}</span>
            <span className="block text-sm">{subTitle}</span>
            <span className="block text-sm pt-4 text-gray">ISBN: {isbn}</span>
          </div>
          <div className="float-right text-right">
            <span className="block text-sm italic">
              {inStorage ? "Forventet levering 5-10 virkedager" : "Forventet salgsdato " + expectedIn}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}

const MyOrders = () => {
  const [order, setOrder] = useState([])
  useEffect(() => {
    const orderId = window.sessionStorage.getItem("groupId")
    fetchApi(webApi + "/GyldendalOrders/" + "c7048b38-c8a0-4c27-a7fa-d05470b7ff9e")
      .then((response) => {
        console.log(response.data)
        setOrder(response.data)
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
      })
      .finally(function () {
        // always executed
      })
  }, [])

  return (
    <div className="bg-white rounded-lg p-4 border-blue">
      <div className="relative lg:pb-2">
        <h2 className="text-2xl font-bold">Mine bestillinger</h2>
        <p className="text-md">Din forespørsel er godkjent. Bekreftelsesemail er sendt til din e-post.</p>
      </div>
      <ul>
        {Books.map((data) => (
          <MyOrdersData
            title={data.title}
            subTitle={data.subTitle}
            isbn={data.ISBN}
            expectedIn={data.expectedIn}
            inStorage={data.inStorage}
          ></MyOrdersData>
        ))}
      </ul>
    </div>
  )
}

export default MyOrders
