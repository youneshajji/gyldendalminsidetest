import { createContext } from "react"

export const UserContext = createContext(null)

export const userInfo = () => {
  const userName = window.sessionStorage.getItem("gatsbyUser")
  const userEmail = window.sessionStorage.getItem("gatsbyUserEmail")
  const accessToken = window.sessionStorage.getItem("gatsbyaccesstoken")
  const parentAccount = window.sessionStorage.getItem("gatsbyUserParentAccount")
  const contact = window.sessionStorage.getItem("gatsbyContactId")
  let userLoggedInn = false
  if (userName !== null && userName != "") userLoggedInn = true

  return {
    name: userName,
    email: userEmail,
    isLoggedInn: userLoggedInn,
    accessToken: accessToken,
    parentAccountId: parentAccount,
    contactId: contact,
  }
}
