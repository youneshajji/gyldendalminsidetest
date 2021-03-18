import React from "react"

const Checked = (allreadySent) => {
  if (allreadySent.data == true) {
    return (
      <input
        id="settings-option-0"
        name="privacy_setting"
        type="checkbox"
        className="form-checkbox h-7 w-7 text-red-200 rounded absolute left-1 top-4"
        checked
      />
    )
  } else {
    return (
      <input
        id="settings-option-0"
        name="privacy_setting"
        type="checkbox"
        className="form-checkbox h-7 w-7 text-red-500 rounded absolute left-1 top-4"
      />
    )
  }
}

const AssessmentCopy = (data) => {
  return (
    <fieldset>
      <div className="bg-white rounded-md -space-y-px">
        <div className="relative rounded-tl-md rounded-tr-md border-b flex p-3">
          <div className="inline-flex items-center mt-3 box-shadow-none">
            <Checked data={data.allreadySent} />
          </div>
          <div>
            <label htmlFor="settings-option-0" className="ml-3 flex flex-col cursor-pointer pl-5">
              <span className="block font-semibold text-md">{data.title}</span>
              <span className="block text-sm">{data.subTitle}</span>
              <span className="block text-sm pt-4">ISBN: {data.ISBN}</span>
            </label>
            <div className="absolute inset-y-0 right-0 top-2">
              <span className="block text-sm text-right">
                {data.inStorage ? "På lager" : "Kommer på lager " + data.expectedIn}
              </span>
              <h4 className="block text-sm pt-4 text-right">Forventet levering 5-10 virkedager</h4>
              <div className="flex flex-col-reverse divide-y divide-y-reverse divide-rose-400"></div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
    //     <div className="">
    //     <div className="">
    //       <h2 className="text-3xl font-bold pb-3">Mine bestillinger</h2>
    //       <h5 className="text-md">Din forespørsel er godkjent. Bekreftelsesemail er sendt til din e-post.</h5>
    //     </div>
    //     <div className="pt-10">
    //       <h3 className="font-semibold">Velg vurderingseksemplar</h3>
    //       <div className="">
    //         {books.data.map((data) => (
    //           <BookOrders {...data}></BookOrders>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
  )
}

export default AssessmentCopy
