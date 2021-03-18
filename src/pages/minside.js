import * as React from "react"
import "tailwindcss/tailwind.css"
import { Router } from "@reach/router"
import { withPrefix } from "gatsby"
import Home from "../components/MyPage/Home" // Startsiden til Min Side /minside/
import FormAssessmentCopy from "../components/MyPage/FormAssessmentCopy"
import FormSampleAccess from "../components/MyPage/FormSampleAccess"
import UserInfo from "../components/MyPage/UserInfo"
import FinalPage from "../components/MyPage/FinalPage"

const minside = () => {
  return (
    <>
      <div className="col-span-1"> </div>
      <div className="col-span-auto">
        <Router basepath={withPrefix("/minside")}>
          <FormSampleAccess path="prøvetilgang" component={FormSampleAccess} />
          <FormAssessmentCopy path="vurderingseksemplar" component={FormAssessmentCopy} />
          <UserInfo path="brukerprofil" component={UserInfo} />
          <FinalPage path="ordre" component={FinalPage} />
          <Home path="/" component={Home} />
        </Router>
      </div>
    </>
  )
}

export default minside
