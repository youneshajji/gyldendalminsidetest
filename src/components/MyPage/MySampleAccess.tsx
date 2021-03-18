import React, { useState } from "react"

const Books = [
  {
    title: "Multi 1A, Lærernes bok",
    ISBN: 9876543212343,
    subTitle: "Undertittel",
    inStorage: true,
    expectedIn: "",
    allreadySent: false,
    expiredDate: "02.05.2021",
  },
  {
    title: "Multi 2A",
    ISBN: 9876543212342,
    subTitle: "Undertittel",
    inStorage: true,
    expectedIn: "",
    allreadySent: true,
    expiredDate: "02.05.2021",
  },
  {
    title: "Multi 5A, Elevbok",
    ISBN: "9876543212341",
    subTitle: "Undertittel",
    inStorage: false,
    expectedIn: "04.05.21",
    allreadySent: false,
    expiredDate: "02.05.2021",
  },
  {
    title: "Henriks Bok",
    ISBN: "9876543212341",
    subTitle: "Undertittel",
    inStorage: false,
    expectedIn: "04.05.21",
    allreadySent: false,
    expiredDate: "02.05.2021",
  },
]

const MySampleAccessData = ({ title, isbn, expiredDate }) => {
  return (
    <li>
      <div className="relative pb-4 border-b space-y-4">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3 justify-between">
          <div className="min-w-0 flex-1 flex space-x-4 justify-between">
            <div>
              <span className="block font-semibold text-md">{title}</span>
              <span className="block text-sm pt-2">ISBN: {isbn}</span>
            </div>
            <div className="text-right float-right">
              <span className="text-right text-sm text-indigo-800 pb-4">
                {" "}
                Utløper <time dateTime="04.02.2021">{expiredDate}</time>{" "}
              </span>
              <div className="flex pt-2">
                <span className="text-right text-sm text-gray-800 ">Gå til produktet </span>
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-end transform -rotate-45">
                    <a href="https://prosesspilotene.no/">
                      <svg
                        className="h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="tomato"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893L15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.7071 9.70711C11.3166 10.0976 10.6834 10.0976 10.2929 9.70711C9.90238 9.31658 9.90238 8.68342 10.2929 8.29289L12.5858 6H1C0.447716 6 -2.41411e-08 5.55228 0 5C2.41411e-08 4.44772 0.447716 4 1 4H12.5858L10.2929 1.70711C9.90238 1.31658 9.90238 0.683418 10.2929 0.292893Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

const MySampleAccess = () => {
  const [size, setSize] = useState(3)
  const [buttonName, setButtonName] = useState("Vis mer")
  const onClick = () => {
    if (size === 3) {
      setButtonName("Vis mindre")
      setSize(Books.length)
    } else {
      setButtonName("Vis mer")
      setSize(3)
    }
  }
  return (
    <div className="bg-white rounded-lg p-4 border-blue">
      <div className="relative lg:pb-2">
        <h2 className="text-2xl font-bold">Mine prøvetilganger </h2>
      </div>
      <ul>
        {Books.map((data) => (
          <MySampleAccessData title={data.title} isbn={data.ISBN} expiredDate={data.expiredDate}></MySampleAccessData>
        )).slice(0, size)}
      </ul>
      <div className="flex justify-center border-black">
        <button className="justify-center border-b font-semibold" onClick={onClick}>
          {buttonName}
        </button>
      </div>
    </div>
  )
}

export default MySampleAccess
