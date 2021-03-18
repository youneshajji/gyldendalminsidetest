import React from "react"
import SEO from "../SEO/SEO"
import MyOrders from "./MyOrders"
import MySampleAccess from "./MySampleAccess"
import MyAssessmentCopy from "./MyAssessmentCopy"
import MiniUserInfo from "./MiniUserInfo"

const FinalPage = () => {
  return (
    <div className="">
      <SEO title="MinSide" description="Gyldendal sin hjem side." />
      <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 gap-4 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
        <div className="space-y-6 lg:col-start-1 lg:col-span-1 p-2">
          <MiniUserInfo></MiniUserInfo>
        </div>
        <div className="space-y-6 lg:col-start-2 lg:col-span-3 p-2">
          <MyOrders></MyOrders>
          <MySampleAccess></MySampleAccess>
          <MyAssessmentCopy></MyAssessmentCopy>
        </div>
      </div>
    </div>
  )
}

export default FinalPage
