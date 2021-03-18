import React, { useRef, useState, useMemo, useEffect, useCallback } from "react"
import { DisabledButton } from "../Common/Buttons"
import { ListObject, InputObject, ListTextDesc } from "../Common/TextAndInput"
import { fetchApi, patchApi } from "../Common/WebApi-utils"
import SearchableDropDown from "../DropDowns/SearchableDropdown"
import SEO from "../SEO/SEO"
import { time } from "console"
import { webApi } from "../Security/ApiEndpoints"

const NewUser = () => {
  const [schools, setSchools] = useState([])

  const [open, setOpen] = useState(false)
  const inputRef = useRef({})
  const [confirm, setConfirm] = useState(false)
  const [user, setUser] = useState([])
  const [, setInputValue] = useState("")
  const [account, setAccount] = useState({})

  const [userInfo, setUserInfo] = useState({
    emailaddress1: "",
    firstname: "",
    lastname: "",
    fullname: "",
    mobilephone: "",
  })
  console.log()
  useEffect(() => {
    fetchApi(webApi + "/GyldendalContacts")
      .then(async (response) => {
        setUser(response.data)
        setAccount(response.data.account)
      })
      .catch(async (error) => {
        console.log(error)
      })
  }, [])
  // useEffect(() => {
  //   fetchApi("https://localhost:44328/api/GyldendalAccounts/search/" + value)
  //     .then(async (response) => {
  //       setSchools(response.data.value)
  //     })
  //     .catch(async (error) => {
  //       console.log(error)
  //     })
  // }, [value])

  useMemo(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      emailaddress1: user.emailaddress1,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      mobilephone: user.mobilephone,
      UUID: user.pp_uuid,
    }))
  }, [user])

  const onConfirm = (val) => {
    var regex = new RegExp(/^[0-9]{8}$/)
    if (regex.test(val)) {
      setConfirm(true)
    } else {
      setConfirm(false)
    }
  }

  return (
    <section aria-labelledby="userprofile" className="mx-auto lg:max-w-2xl sm:max-w-sm ">
      <SEO title="Ny bruker" description="Gyldendal ny bruker registrering." />
      <div className=" bg-white px-8 py-5 sm:rounded-lg sm:px-6 justify-self-center bg-white-500">
        <div className="mt-6 flow-root">
          <h1 className="text-3xl font-bold pb-5">Vennligst fyll ut</h1>
        </div>
        <div className="mt-4 flow-root border-b">
          <ul>
            <div className="border-b pb-4">
              <>
                <ListTextDesc text="Navn" />
                <ListObject className="" text={userInfo.fullname} />
                <ListTextDesc text="E-post" />
                <ListObject className="" text={userInfo.emailaddress1} />
                <ListTextDesc text="Mobil*" />
                <InputObject
                  className=""
                  refValue={(el) => (inputRef.current["phone"] = el)}
                  defaultValue=""
                  onChange={(e) => onConfirm(e.target.value)}
                />
                <ListTextDesc text="Skole*" />
                <SearchableDropDown />
                <div className="relative space-x-3 ">
                  <p className="text-sm text-gray flex italic">
                    Finner du ikke skolen din, ta kontakt med
                    <span className="underline pl-2"> support@gyldendal.no</span>
                  </p>
                </div>
              </>
            </div>
            <p className="text-md text-gray  mt-4">
              Vi er opptatt av ditt personvern. Les hvordan vi sikrer dine opplysninger i vår
              <span className="underline"> personvernerklæring</span>.
            </p>
            <p className="text-md font-semibold mt-4">
              Ved å fylle ut dette skjemaet blir du registrert i Gyldendals database. Du kan når som helst be om at dine
              opplysninger blir slettet ved å henvende deg til oss. Dine personopplysninger blir ikke utlevert til
              tredjeparter.
            </p>
          </ul>
        </div>
        <div className="flex justify-end">
          <DisabledButton disabledWhen={confirm} onClick="" text="Bekreft" link="/minside/vurderingseksemplar" />
        </div>
      </div>
    </section>
  )
}
export default NewUser
