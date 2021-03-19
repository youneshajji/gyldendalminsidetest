import React, { useCallback, useEffect, useState, useMemo } from "react"
import UserInfo from "../components/MyPage/UserInfo"
import { userInfo } from "../components/Security/UserContext"
import { navigate } from "gatsby"
import ConfirmInfo from "../components/MyPage/ConfirmInfo"
import { fetchApi } from "../components/Common/WebApi-utils"

import { createHistory, Redirect, Location } from "@reach/router"
import queryString from "query-string"
import Cookies from "js-cookie"
import FormAssessmentCopy from "../components/MyPage/FormAssessmentCopy"
import { identityWebApi, webApi } from "../components/Security/ApiEndpoints"

const IndexPage = () => {
  // let history = createHistory(window)
  const [user, setUser] = useState([])
  const [account, setAccount] = useState([])
  const [tibetAccessId, setTibetAccessId] = useState()
  const [updateInfo, setUpdateInfo] = useState(false)

  useEffect(() => {
    let queryParam
    if (location.search !== null) queryParam = queryString.parse(location.search)

    if (queryParam.Teacher === "false") {
      //TODO: ahow message: only for teachers
    }

    //Prøve tilgang
    window.sessionStorage.setItem("productid", queryParam.productid)
    window.sessionStorage.setItem("producturl", queryParam.producturl)
    window.sessionStorage.setItem("redirecturl", queryParam.redirecturl)

    //Vurderingseks
    window.sessionStorage.setItem("groupid", queryParam.productid)
    window.sessionStorage.setItem("redirecturl", queryParam.redirecturl)

    //Vent med dette
    //TODO: if new gyldendal user (that means there is no token in query pram, only firtsname, lastname and email)
    //Then show new user schema, after user is created in CRM, navigate back to identityapi (navigate(IdentityApiEndpoint + "/TibetIdentity/GyldendalUser/{mobilephone")) with mobilephone as queryparam

    //Get publication Access
    if (!queryParam.token && queryParam.Teacher !== "false") navigate(identityWebApi + "/TibetIdentity")

    //TODO:navigate to New user schema and send mobilenr to api
    // if (queryParam.firstname && queryParam.usertype === "tibet")
    //   navigate(IdentityApiEndpoint + "/TibetIdentity?mobilephone=48209393")

    //Get Contact
    if (queryParam.token) {
      console.log("queryParam.token")
      console.log(queryParam.token)
      window.sessionStorage.setItem("gyldendal_access_token", "Bearer " + queryParam.token)
      window.sessionStorage.setItem("gyldendal_access_token_expire", queryParam.token_expire)
      window.sessionStorage.setItem("usertype", queryParam.usertype)
      window.sessionStorage.setItem("groupId", queryParam.groupId)

      console.log("gyldendal_access_token_expire")
      console.log(window.sessionStorage.getItem("gyldendal_access_token_expire"))

      fetchApi(webApi + "/GyldendalContacts")
        .then((response) => {
          setUser(response.data)
          setAccount(response.data.account)
          //TODO: check verified date then nqavigate or show userinfo
          console.log(response.data)
          document.getElementById("headerName").textContent = response.data.fullname
          window.sessionStorage.setItem("accountId", response.data.account.accountid)
        })
        .catch((error) => {
          console.log("error")
          console.log(error)
        })
        .finally(function () {
          // always executed
        })
    }
  }, [])
  useMemo(() => {
    var lastVerified = new Date(user.pp_profileverifiedon)

    var today = new Date()

    var dateChecker = new Date(today.setMonth(today.getMonth() - 3))

    console.log(lastVerified)

    console.log(dateChecker)

    lastVerified > dateChecker ? setUpdateInfo(true) : setUpdateInfo(false)
  }, [user])

  console.log(updateInfo)

  return (
    <>
      {/* Header tag from */}

      {/* Main here */}
      <main>
        <div className="justify-center py-6 sm:px-6 lg:px-8 bg-white">
          {/* <div>{!dateCheck ? <UserInfo /> : <FormAssessmentCopy />}</div> */}
          {updateInfo ? <UserInfo user={user} account={account} /> : <FormAssessmentCopy />}
        </div>
      </main>
    </>
  )
}

export default IndexPage
