import React, { useState, useRef, useMemo, useEffect } from "react"
import { navigate, Link } from "gatsby"
import SearchableDropDown from "../DropDowns/SearchableDropdown"
import { EmailSupportFeide } from "../Common/InfoText"

import CancelModal from "../Modals/CancelModal"
import { fetchApi, patchApi } from "../Common/WebApi-utils"
import { updateInfo } from "../Common/Utils"
import { EditButton, SaveButton, CancelButton, DisabledButton } from "../Common/Buttons"

import SEO from "../SEO/SEO"

import Alerts from "../Alerts/AlertCustom"
import { InputObject } from "../Common/TextAndInput"
import LoadingModal from "../Modals/LoadingModal"

const FeideLogin = ({ userInfo, setUserInfo, accountInfo, setAccountInfo }) => {
  const [phoneOk, setPhoneOk] = useState(false)
  const [editMode, setEditMode] = useState("default")
  const [emailOk, setEmailOk] = useState(false)

  // const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput(userInfo.firstname)
  // const { value: email, setValue: setEmail, bind: bindEmail, reset: resetEmail } = useInput("")
  // const { value: firstname, bind: bindfirstname, reset: resetFirstname } = useInput(fname)

  const inputRef = useRef({})

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await onVerifyPhone(e)
    }
  }

  const onVerifyPhone = (val) => {
    // bindEmail == val
    var regex = new RegExp(/^[0-9]{8}$/)
    if (regex.test(val)) {
      setPhoneOk(true)
    } else {
      setPhoneOk(false)
    }
  }

  const onVerifyEmail = (val) => {
    var regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    if (regex.test(val)) {
      setEmailOk(true)
    } else {
      setEmailOk(false)
    }
  }

  return (
    <>
      <li>
        <div className="relative space-y-2">
          {/* <LoadingModal /> */}
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">Navn</h2>
          <div>
            {editMode == "name" ? (
              <div className="relative flex space-x-4">
                <input
                  ref={(el) => (inputRef.current["first_name"] = el)}
                  defaultValue={userInfo.firstname}
                  className="rounded text-md h-10 border-black border w-full px-3"
                  id="firstNameInput"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Fornavn"
                />
                <input
                  ref={(el) => (inputRef.current["last_name"] = el)}
                  defaultValue={userInfo.lastname}
                  className="rounded text-md h-10 border-black border w-full px-3"
                  id="lastNameInput"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Etternavn"
                />

                <CancelButton cancelMethod={setEditMode} cancelMode="default" />
                <SaveButton
                  id="saveName"
                  onClick={() =>
                    updateInfo(
                      "name",
                      inputRef.current["first_name"].value + " " + inputRef.current["last_name"].value,
                      setUserInfo,
                      setAccountInfo,
                      setEditMode
                    )
                  }
                />
              </div>
            ) : (
              <div className="relative flex space-x-5">
                <span>{userInfo.fullname}</span>
                <span
                  className="text-md text-indigo-500 h-6 px-0 border-indigo-500 w-12 border-b cursor-pointer"
                  onClick={() => setEditMode("name")}
                >
                  Endre
                </span>
              </div>
            )}
          </div>
        </div>
      </li>
      <li>
        <div className="relative space-y-2">
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">Mobil</h2>
          <div className="relative flex space-x-5">
            {editMode == "phone" ? (
              <div className="flex space-x-5">
                <input
                  ref={(el) => (inputRef.current["phone"] = el)}
                  className="rounded text-md h-10 border-black border w-full px-3"
                  onChange={(e) => onVerifyPhone(e.target.value)}
                  id="phoneInput"
                  type="number"
                  autoComplete="tel"
                  placeholder="Telefonnummer"
                />
                <button
                  onClick={() => setEditMode("default")}
                  className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                >
                  Avbryt
                </button>
                {phoneOk ? (
                  <div className="relative flex space-x-5">
                    {" "}
                    <button
                      onClick={() =>
                        updateInfo("phone", inputRef.current["phone"].value, setUserInfo, setAccountInfo, setEditMode)
                      }
                      className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                    >
                      Lagre
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="relative flex space-x-5">
                <span>{userInfo.mobilephone}</span>
                <span
                  className="text-md text-indigo-500 h-6 px-0 border-indigo-500 w-12 border-b cursor-pointer"
                  onClick={() => setEditMode("phone")}
                >
                  Endre
                </span>
              </div>
            )}
          </div>
        </div>
      </li>
      <li>
        <div className="relative space-y-2">
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">E-post</h2>
          <div className="relative flex space-x-5">
            {editMode == "email" ? (
              <div className="relative space-y-4">
                <div>
                  <div className="relative pb-4">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex space-x-3">
                      <input
                        type="text"
                        id="feideEmail"
                        className="rounded text-md h-10 text-gray-400 border-gray-400"
                        //TODO! Endre denne eposten til den vi får fra feide.
                        defaultValue="feide@epost.no"
                        disabled
                      />
                    </div>
                    <p className="text-sm text-gray-400 italic">Obs: Denne er ikke redigerbar </p>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    Din e-post er registrert hos Feide. Feil e-postadresse? Ta kontakt med din lokale{" "}
                    <a href="https://www.feide.no/brukerstotte" className="underline">
                      brukerstøtte.
                    </a>{" "}
                  </p>
                </div>
                <h3 className="font-medium pt-4">
                  Ønsker du å motta informasjon fra Gyldendal med en annen e-postadresse?
                </h3>
                <div className="relative flex space-x-5">
                  <input
                    ref={(el) => (inputRef.current["email"] = el)}
                    type="text"
                    // pattern="^[a-zA-Z0-9!#$%&'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$"
                    // onChange={(e) => this.setEmail(e)}
                    // onKeyPress={(e) => handleKeyPress(e)}
                    autoComplete="verify_email"
                    onKeyPress={() => console.log(emailOk)}
                    className="rounded text-md h-10 "
                    placeholder="din@epost.her"
                    onChange={(e) => onVerifyEmail(e.target.value)}
                  />
                  <button
                    onClick={() => setEditMode("default")}
                    className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                  >
                    Abryt
                  </button>
                  <button
                    disabled={emailOk ? false : true}
                    type="submit"
                    className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded disabled:opacity-50"
                  >
                    Lagre
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex space-x-5">
                <span>{userInfo.emailaddress1}</span>
                <span
                  className="text-md text-indigo-500 h-6 border-indigo-500 w-12 border-b cursor-pointer"
                  onClick={() => setEditMode("email")}
                >
                  Endre
                </span>
              </div>
            )}
          </div>
        </div>
      </li>
      <li>
        <div className="relative space-y-2">
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">Skole</h2>
          <div className="relative flex space-x-5">
            <div className="space-y-2">
              <p>{accountInfo.accountname}</p>
              <p>
                {accountInfo.address}, <br /> {accountInfo.zipCode} {accountInfo.city}
              </p>
              <EmailSupportFeide />
            </div>
          </div>
        </div>
      </li>{" "}
    </>
  )
}

const GyldendalLogin = ({ userInfo, setUserInfo, accountInfo, setAccountInfo }) => {
  const [value, setValue] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState({ variant: "", alertText: "" })
  const [editMode, setEditMode] = useState("default")
  const [phoneOk, setPhoneOk] = useState(false)
  const [schoolId, setSchoolId] = useState("")
  const inputRef = useRef({})

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await onVerifyPhone(e)
    }
  }

  const onVerifyPhone = (val) => {
    // bindEmail == val
    var regex = new RegExp(/^[0-9]{8}$/)
    if (regex.test(val)) {
      setPhoneOk(true)
    } else {
      setPhoneOk(false)
    }
  }

  return (
    <>
      <li>
        <div className="relative space-y-2 ">
          {showAlert ? <Alerts variant={alert.variant} text={alert.alertText} /> : null}
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">Navn</h2>
          <div>
            {editMode == "name" ? (
              <div className="relative flex space-x-4">
                <InputObject
                  refValue={(el) => (inputRef.current["first_name"] = el)}
                  defaultValue={userInfo.firstname}
                  onChange={null}
                  id="firstNameInput"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Fornavn"
                />
                <InputObject
                  refValue={(el) => (inputRef.current["last_name"] = el)}
                  defaultValue={userInfo.lastname}
                  onChange={null}
                  id="lastNameInput"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Etternavn"
                />

                <CancelButton cancelMethod={setEditMode} cancelMode="default" />
                <SaveButton
                  id="saveName"
                  onClick={() =>
                    updateInfo(
                      "name",
                      inputRef.current["first_name"].value + " " + inputRef.current["last_name"].value,
                      setUserInfo,
                      setAccountInfo,
                      setEditMode
                    )
                  }
                />
              </div>
            ) : (
              <div className="relative flex">
                <div className="w-1/3">
                  <p id="fullname" className=" text-md">
                    {userInfo.fullname}
                  </p>
                </div>
                <div>
                  <span
                    className="text-md text-indigo-500 h-6 px-0 border-indigo-500 border-b w-12  cursor-pointer "
                    onClick={() => setEditMode("name")}
                  >
                    Endre
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
      <li>
        <div className="relative space-y-2">
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">Mobil</h2>
          <div className="relative flex space-x-5">
            {editMode == "phone" ? (
              <div className="flex space-x-5">
                <InputObject
                  refValue={(el) => (inputRef.current["phone"] = el)}
                  defaultValue=""
                  onChange={(e) => onVerifyPhone(e.target.value)}
                  id="lastNameInput"
                  type="number"
                  autoComplete="tel"
                  placeholder="Telefonnummer"
                />
                <button
                  onClick={() => setEditMode("default")}
                  className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                >
                  Avbryt
                </button>
                {phoneOk ? (
                  <div className="relative flex space-x-5">
                    {" "}
                    <button
                      onClick={() =>
                        updateInfo("phone", inputRef.current["phone"].value, setUserInfo, setAccountInfo, setEditMode)
                      }
                      className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                    >
                      Lagres
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="relative flex w-full">
                <div className="w-1/3 flex">
                  <p id="fullname" className=" text-md">
                    {userInfo.mobilephone}
                  </p>
                </div>
                <div className="flex">
                  <span
                    className="text-md text-indigo-500 h-6 px-0 border-indigo-500 border-b w-12  cursor-pointer "
                    onClick={() => setEditMode("phone")}
                  >
                    Endre
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
      <li>
        <div className="relative space-y-2">
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">E-post</h2>
          <div className="relative flex space-x-5">
            {editMode == "email" ? (
              <div className="relative flex space-x-5">
                <InputObject
                  refValue={(el) => (inputRef.current["email"] = el)}
                  defaultValue=""
                  onChange={null}
                  id="lastNameInput"
                  type="text"
                  autoComplete="email"
                  placeholder="din@epost.her"
                />

                <button
                  onClick={() => setEditMode("default")}
                  className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                >
                  Abryt
                </button>
                <button
                  onClick={() =>
                    updateInfo("email", inputRef.current["email"].value, setUserInfo, setAccountInfo, setEditMode)
                  }
                  className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                >
                  Lagre
                </button>
              </div>
            ) : (
              <div className="relative flex ">
                <div className="relative flex">
                  <p id="fullname" className=" text-md">
                    {userInfo.emailaddress1}
                  </p>
                </div>
                <div className="relative flex">
                  <span
                    className="text-md text-indigo-500 h-6 px-0 border-indigo-500 border-b w-12  cursor-pointer "
                    onClick={() => setEditMode("email")}
                  >
                    Endre
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
      <li>
        <div className="relative space-y-2">
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <h2 className="text-md font-semibold">Skole</h2>
          <div className="relative flex space-x-5"></div>

          {editMode === "school" ? (
            <div>
              <div className="flex space-x-5">
                <div>
                  <SearchableDropDown />
                </div>
                <button
                  onClick={() => setEditMode("default")}
                  className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                >
                  Abryt
                </button>
                <button
                  onClick={() => updateInfo("school", "", setUserInfo, setAccountInfo, setEditMode)}
                  className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                >
                  Lagre
                </button>
              </div>
              <EmailSupportFeide />
            </div>
          ) : (
            <div className="relative flex  ">
              <div className="w-1/3 ">
                <p id="fullname" className=" text-md">
                  {accountInfo.accountname}
                </p>
              </div>
              <div>
                <span
                  className="text-md text-indigo-500 h-6 px-0 border-indigo-500 border-b w-12  cursor-pointer "
                  onClick={() => setEditMode("school")}
                >
                  Endre
                </span>
              </div>
            </div>
          )}
        </div>
      </li>
    </>
  )
}

const UserInfo = ({ user, account }) => {
  const [isCheck, setCheck] = useState(false)
  const [userType, setUserType] = useState("")
  const [modal, setModal] = useState(false)
  const windowGlobal = typeof window !== "undefined" && window

  const onConfirm = () => {
    const modifiedOn = Intl.DateTimeFormat("nb-NO").format(user.pp_profileverifiedon)
    const modifiedOnUTC = new Date()

    const modifiedOnNorway = new Date(modifiedOnUTC.setHours(modifiedOnUTC.getHours() + 1))

    const data = { profileVerifiedOn: modifiedOnNorway }
    patchApi(ApiEndpoint + "/GyldendalContacts", data)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [userInfo, setUserInfo] = useState({
    emailaddress1: "",
    firstname: "",
    lastname: "",
    fullname: "",
    mobilephone: "",
    accountname: "",
  })
  const [accountInfo, setAccountInfo] = useState({
    accountname: "",
    address: "",
    zipCode: "",
    city: "",
  })
  useEffect(() => {
    setUserType(window.sessionStorage.getItem("usertype"))
  }, [user])

  useMemo(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      emailaddress1: user.emailaddress1,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      mobilephone: user.mobilephone,
      profileverifiedon: user.pp_profileverifiedon,
    }))
  }, [user])
  useMemo(() => {
    setAccountInfo((prevState) => ({
      ...prevState,
      accountname: account.name,
      address: account.address1_line1,
      zipCode: account.ci_Postnummer,
      city: account.ci_PostadressePoststed,
    }))
  }, [account])

  // useEffect(() => {
  //   ;["click", "touchend"].forEach((e) => {
  //     document.addEventListener(e)
  //   })
  //   return () =>
  //     ["click", "touchend"].forEach((e) => {
  //       document.removeEventListener(e)
  //     })
  // }, [])

  // function toggle(e) {
  //   setOpen(e && e.target === ref.current)
  // }

  // const onVerify = () => {
  //   // TODO: check if assessmentCopy or SampleAccess from url param, navigate to the respective page
  //   return navigate("/minside/vurderingseksemplar") 2021-03-05T12:03:56Z
  // }

  return (
    <section aria-labelledby="userprofile" className="mx-auto lg:max-w-2xl sm:max-w-sm ">
      <SEO title="Bekreft opplysninger" description="Gyldendal sin hjem side." />
      <div className=" bg-white px-8 py-5 sm:rounded-lg sm:px-6 justify-self-center bg-white-500">
        <div className="mt-6 flow-root">
          <h1 className="text-3xl font-bold pb-5">Bekreft opplysningene</h1>
          <span className="text-md pb-5">
            Før du kan gå videre ønsker vi at du ser over kontaktopplysningene dine. Dersom de ikke stemmer, må du
            oppdatere informasjonen før du bekrefter nederst på siden.
          </span>
          <ul className="-mb-5 ">
            <div className="border-b space-y-4">
              {userType === "feide" ? (
                <FeideLogin
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  accountInfo={accountInfo}
                  setAccountInfo={setAccountInfo}
                />
              ) : null}
              {userType === "tibet" ? (
                <GyldendalLogin
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  accountInfo={accountInfo}
                  setAccountInfo={setAccountInfo}
                />
              ) : null}
              <li>
                <div className="flex mt-6 pb-8 ">
                  <label className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      className="form-checkbox h-7 w-7 text-carmine-500 rounded "
                      onChange={() => {
                        setCheck(!isCheck)
                      }}
                    />
                    <span className="ml-2">Jeg bekrefter at de registrerte opplysningene er korrekte</span>
                  </label>
                </div>
              </li>
            </div>
            {modal ? <CancelModal proceed={() => setModal(false)} /> : null}

            <li>
              <div className="flex justify-end py-4">
                <button
                  onClick={() => setModal(true)}
                  className="h-10 m-2 underline bg-transparent text-black hover:text-gray  px-6 border-none"
                >
                  Avbryt
                </button>

                <button
                  onClick={() => navigate("minside/vurderingseksemplar")}
                  disabled={isCheck ? false : true}
                  className="h-10 m-2 bg-carmine-500 hover:bg-carmine-800 text-white font-semibold hover:text-white py-2 px-6 border border-carmine-500 rounded disabled:opacity-50 disabled:cursor-default"
                >
                  Gå videre
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default UserInfo
