import React from "react"

const Books = [
  {
    title: "Multi 1A, Lærernes bok",
    ISBN: 9876543212343,
    subTitle: "Undertittel",
    inStorage: true,
    expectedIn: "",
    allreadySent: false,
    lang: "Norsk, bokmål",
  },
  {
    title: "Multi 2A",
    ISBN: 9876543212342,
    subTitle: "Undertittel",
    inStorage: true,
    expectedIn: "",
    allreadySent: true,
    lang: "Norsk, bokmål",
  },
  {
    title: "Multi 5A, Elevbok",
    ISBN: "9876543212341",
    subTitle: "Undertittel",
    inStorage: false,
    expectedIn: "04.05.21",
    allreadySent: false,
    lang: "Norsk, bokmål",
  },
]

const MyAssessmentCopyData = ({ title, subTitle, isbn, lang }) => {
  return (
    <li>
      <div className="relative pb-4 border-b space-y-4">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3 justify-between">
          <div>
            <span className="block font-semibold text-md">{title}</span>
            <span className="block text-sm">{subTitle}</span>
            <span className="block text-sm pt-4">ISBN: {isbn}</span>
          </div>

          <div className="text-right text-sm">
            <span className="block text-sm text-right">{lang}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

const MyAssessmentCopy = () => {
  return (
    <div className="bg-white rounded-lg p-4 border-blue">
      <div className="relative lg:pb-2">
        <h2 className="text-2xl font-bold">Mine vurderingseksemplarer</h2>
      </div>
      <ul>
        {Books.map((data) => (
          <MyAssessmentCopyData
            title={data.title}
            subTitle={data.subTitle}
            isbn={data.ISBN}
            lang={data.lang}
          ></MyAssessmentCopyData>
        ))}
      </ul>
    </div>
  )
}

export default MyAssessmentCopy
