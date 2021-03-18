import { webApi } from "../Security/ApiEndpoints"
import { patchApi } from "./WebApi-utils"

export const updateInfo = (patchMode, inputRef, setUserInfo, setAccountInfo, setEditMode) => {
  let data = {}

  switch (patchMode) {
    case "name":
      const fnameValue = inputRef.split(" ")[0]
      const lnameValue = inputRef.split(" ")[1]
      console.log(fnameValue + " " + lnameValue)

      // if (fnameValue + " " + lnameValue  === userInfo.fullname){
      //   setShowAlert("changeName")
      //   setAlert((prevState) => ({
      //     ...prevState,
      //     variant: "danger",
      //     alertText: "Navnene er ikke endret",
      //   }))
      // } else{

      data = { firstname: fnameValue, lastname: lnameValue }
      setUserInfo((prevState) => ({
        ...prevState,
        firstname: fnameValue,
        lastname: lnameValue,
        fullname: fnameValue + " " + lnameValue,
      }))
      document.getElementById("headerName").textContent = fnameValue + " " + lnameValue
      break
    case "phone":
      const phoneValue = inputRef

      data = { mobilephone: phoneValue }
      setUserInfo((prevState) => ({
        ...prevState,
        mobilephone: phoneValue,
      }))
      break
    case "email":
      const emailValue = inputRef

      data = { email: emailValue }
      setUserInfo((prevState) => ({
        ...prevState,
        emailaddress1: emailValue,
      }))
      break
    case "school":
      const schoolId = window.sessionStorage.getItem("schoolId")
      const schoolName = window.sessionStorage.getItem("schoolName")
      data = { parentAccountId: schoolId }
      setAccountInfo((prevState) => ({
        ...prevState,
        accountname: schoolName,
      }))
      break

    default:
      break
  }

  patchApi(webApi + "/GyldendalContacts", data)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })

  setEditMode("default")
}
