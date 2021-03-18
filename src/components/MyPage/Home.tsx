import React, { useState, useContext, useEffect } from "react"
import { navigate } from "gatsby"
// import { userSignIn } from "../Security/AuthService"
import { UserContext, userInfo } from "../Security/UserContext"
// import MyPageLayout from "../Layout/MyPageLayout"
import { useParams } from "@reach/router"
import UserInfo from "./UserInfo"

/**
 * Denne er Start komponenten for MinSide. Den lastes etter /minside/ adressen.
 * Og den danner slikt sett hovedgrunnlaget for MinSide
 * Den skal være minst mulig, og helst kalle på andre komponenter som dashboards osv.
 */
const Home = (param) => {
  // const { user, setUser } = useContext(UserContext)
  if (param.array) {
    window.localStorage.setItem("bookArray", JSON.stringify(param.array))
    console.log(JSON.parse(window.localStorage.getItem("bookArray") ?? ""))
  }

  console.log(param.array)

  // useEffect(() => {
  //   setUser(userInfo())
  // }, [])

  return <div></div>
}

export default Home
