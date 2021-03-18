import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import Moment from "moment"
import "moment-timezone"
import { Date } from "prismic-reactjs"
import countries from "react-select-country-list"
import Select from "react-select"
import Alert from "../Alerts/AlertCustom"
import { UserContext } from "../Security/UserContext"
import SettingsLayout from "../Layout/SettingsLayout"
import { fetchApi, patchApi, postApi, postApiAnonymous } from "../Common/WebApi-utils"
import { webApi } from "../Security/ApiEndpoints"

/**
 * Denne komponenten brukes til å vise og redigere brukerprofil og samtykke.
 * TODO
 * Change adresse from besøk to post adress
 * Samtykke delen skal bruke kompenten Concent fra Marketing
 * Interesser skal brukes komponenten Interesst fra Marketing
 *
 *
 */

const UserProfile = () => {
  const userForm = useRef(null)
  const [countryOptions, setcountryOptions] = useState([{}])
  const [showVerifyMobile, setshowVerifyMobile] = useState(false)
  const [isVerifyingMobile, setisVerifyingMobile] = useState(false)
  const [isMobileVerified, setisMobileVerified] = useState(false)
  const [showVerifyCode, setshowVerifyCode] = useState(false)
  const [mobileCode, setmobileCode] = useState("")
  const [mobileCodeSMS, setmobileCodeSMS] = useState("")
  const { user, setUser } = useContext(UserContext)
  const [isSaving, setIsSaving] = useState(false)
  const [showAlert, setshowAlert] = useState(false)
  const [alert, setAlert] = useState({ variant: "", alertText: "" })

  const [profile, setProfile] = useState({
    email: "",
    firstname: "",
    lastname: "",
    birthdate: new Date(),
    gender: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    mobile: "",
    mobileVerifiedDate: "",
  })

  const [spanHidden, setSpanHidden] = useState({
    emailHidden: false,
    firstnameHidden: false,
    lastnameHidden: false,
    birthdateHidden: false,
    genderHidden: false,
    addressHidden: false,
    postalCodeHidden: false,
    cityHidden: false,
    countryHidden: false,
    mobileHidden: false,
  })

  useEffect(() => {
    setcountryOptions(countries().getData())
    fetchProfile()
  }, [fetchProfile])

  const fetchProfile = useCallback(async () => {
    setIsSaving(true)
    fetchApi(webApi + "/ContactsTest")
      .then(async (response) => {
        setIsSaving(false)

        window.sessionStorage.setItem("gatsbyUserParentAccount", response.data.parentAccountId)

        setProfile((prevState) => ({
          ...prevState,
          email: response.data.emailAddress,
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          mobile: response.data.mobilePhone,
          address: response.data.address.line1,
          city: response.data.address.city,
          postalCode: response.data.address.postalCode,
          country: response.data.address.country,
        }))

        const mobileVerifiedFormattedDate = Intl.DateTimeFormat("nb-NO", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(Date(response.data.mobileVerified))

        if (response.data.mobileVerified == null) setshowVerifyMobile(true)
        else
          setProfile((prevState) => ({
            ...prevState,
            mobileVerifiedDate: mobileVerifiedFormattedDate,
          }))
      })
      .catch(async (error) => {
        setIsSaving(false)
        setAlert((prevState) => ({
          ...prevState,
          showAlert: true,
          variant: "danger",
          alertText: error.message,
        }))
      })
      .finally(function () {
        // always executed
      })
  }, [])

  const onVerifyMobile = async () => {
    setIsSaving(true)
    const randomNr = Math.floor(1000 + Math.random() * 9000)
    setisVerifyingMobile(true)
    setshowAlert(false)
    setmobileCodeSMS(randomNr.toString())

    const form = userForm.current
    const fieldValue = form["mobilePhone"].value

    postApiAnonymous(webApi + "/Twilio", {
      to: fieldValue,
      body: "Bekreftelses kode for Gyldendal AS: " + randomNr.toString(),
    })
      .then(async (response) => {
        setIsSaving(false)
        setshowVerifyMobile(false)
        setisVerifyingMobile(false)
        setshowVerifyCode(true)
        setshowAlert(true)
        setAlert((prevState) => ({
          ...prevState,
          variant: "success",
          alertText: "A text message has been sent!",
        }))
      })
      .catch(async (error) => {
        setIsSaving(false)
        setisVerifyingMobile(false)
        setshowVerifyCode(false)
        setshowAlert(true)
        setAlert((prevState) => ({
          ...prevState,
          variant: "danger",
          alertText: error.message,
        }))
      })
      .finally(function () {
        // always executed
      })
  }

  const onVerifyCode = async () => {
    setIsSaving(true)
    const form = userForm.current
    const fieldValue = form["mobileverify"].value

    if (fieldValue !== mobileCodeSMS) {
      setisMobileVerified(false)
      setshowVerifyCode(true)
      setshowAlert(true)
      setAlert((prevState) => ({
        ...prevState,
        variant: "danger",
        alertText: "Koden stemmer ikke",
      }))
    } else {
      const mobileVerifiedCRMDate = Moment()

      patchApi(webApi + "/ContactsTest/me", { mobileVerified: mobileVerifiedCRMDate })
        .then(async (response) => {
          setIsSaving(false)
          setshowVerifyMobile(false)
          setisMobileVerified(true)
          setshowVerifyCode(false)
          setshowAlert(true)
          setAlert((prevState) => ({
            ...prevState,
            variant: "success",
            alertText: "Ditt mobilnummer er verifisert",
          }))
        })
        .catch(async (error) => {
          setIsSaving(false)
          setshowVerifyMobile(true)
          setisVerifyingMobile(false)
          setshowVerifyCode(true)
          setshowAlert(true)
          setAlert((prevState) => ({
            ...prevState,
            variant: "danger",
            alertText: error.message,
          }))
        })
        .finally(function () {
          // always executed
        })
    }
  }

  const Update = async (fieldName) => {
    setIsSaving(true)
    const form = userForm.current
    let fieldValue = form[fieldName].value

    if (fieldName === "address") {
      const addressValue = form["address"].value
      const postalCodeValue = form["postalcode"].value
      const cityValue = form["city"].value
      const countryValue = form["country"].value

      fieldValue = {
        line1: addressValue,
        postalCode: postalCodeValue,
        city: cityValue,
        country: countryValue,
      }
    }

    patchApi(webApi + "/ContactsTest/me", { [fieldName]: fieldValue })
      .then(async (response) => {
        fetchProfile()
        setIsSaving(false)
        setshowAlert(true)
        setAlert((prevState) => ({
          ...prevState,
          variant: "success",
          alertText: "Profilen din er oppdatert!",
        }))
      })
      .catch(async (error) => {
        setIsSaving(false)
        setshowAlert(true)
        setAlert((prevState) => ({
          ...prevState,
          showAlert: true,
          variant: "danger",
          alertText: error.message,
        }))
      })
      .finally(function () {
        // always executed
      })
  }

  return (
    <SettingsLayout>
      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profil</h3>
          <p className="max-w-2xl text-sm text-gray-500">Denne informasjonen deles kun med ansatte i Gyldendal.</p>
        </div>
        <div className="mt-6">
          <div style={showAlert ? {} : { display: "none" }}>
            <Alert variant={alert.variant} text={alert.alertText} />
          </div>
          <form ref={userForm}>
            <dl className="divide-y divide-gray-200">
              {!spanHidden.firstnameHidden ? (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Fornavn</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">{profile.firstname}</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, firstnameHidden: true }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Endre
                      </button>
                    </span>
                  </dd>
                </div>
              ) : (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Fornavn</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      <input
                        defaultValue={profile.firstname}
                        type="text"
                        name="firstname"
                        id="first_name"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => Update("firstname")}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Lagre
                      </button>
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, firstnameHidden: false }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        |Abryt
                      </button>
                    </span>
                  </dd>
                </div>
              )}
              {!spanHidden.lastnameHidden ? (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Etternavn</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">{profile.lastname}</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, lastnameHidden: true }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Endre
                      </button>
                    </span>
                  </dd>
                </div>
              ) : (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Etternavn</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      <input
                        defaultValue={profile.lastname}
                        type="text"
                        name="lastname"
                        id="lastname"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => Update("lastname")}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Lagre
                      </button>
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, lastnameHidden: false }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        |Abryt
                      </button>
                    </span>
                  </dd>
                </div>
              )}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </span>
                  <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                    <button
                      type="button"
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Endre
                    </button>
                    <span className="text-gray-300" aria-hidden="true">
                      |
                    </span>
                    <button
                      type="button"
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Fjern
                    </button>
                  </span>
                </dd>
              </div>
              {!spanHidden.mobileHidden ? (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                  <dt className="text-sm font-medium text-gray-500">Mobilnummer</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      {profile.mobile} Verifisert den: {profile.mobileVerifiedDate}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, mobileHidden: true }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Endre
                      </button>
                    </span>
                  </dd>
                </div>
              ) : (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                  <dt className="text-sm font-medium text-gray-500">Mobilnummer</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      <input
                        defaultValue={profile.mobile}
                        type="text"
                        name="mobilePhone"
                        id="mobile"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => Update("mobilePhone")}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Lagre
                      </button>
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, mobileHidden: false }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        |Abryt
                      </button>
                    </span>
                  </dd>
                  <dt className="text-sm font-medium text-gray-500">Verifisert den: {profile.mobileVerifiedDate}</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      <input
                        type="text"
                        name="mobileverify"
                        id="mobileverify"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        placeholder="Tast inn koden du får på SMS!"
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => onVerifyMobile()}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Motta kode
                      </button>
                      <button
                        onClick={() => onVerifyCode()}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        |Verifiser
                      </button>
                    </span>
                  </dd>
                </div>
              )}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500">Epost</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow"> {profile.email} </span>
                </dd>
              </div>
              {!spanHidden.addressHidden ? (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Besøksadresse</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      {profile.address}, {profile.postalCode} {profile.city}, {profile.country}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, addressHidden: true }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Endre
                      </button>
                    </span>
                  </dd>
                </div>
              ) : (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      <input
                        defaultValue={profile.address}
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Adresse"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </span>
                    <span className="flex-grow">
                      <input
                        defaultValue={profile.postalCode}
                        type="number"
                        name="postalcode"
                        id="postalcode"
                        placeholder="Postnr."
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </span>
                    <span className="flex-grow">
                      <input
                        defaultValue={profile.city}
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Sted"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </span>
                    <span className="flex-grow">
                      <Select
                        classNameName="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        name="country"
                        value={profile.country}
                        placeholder="Land"
                        options={countryOptions}
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => Update("address")}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Lagre
                      </button>
                      <button
                        onClick={() => setSpanHidden((prevState) => ({ ...prevState, addressHidden: false }))}
                        type="button"
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        |Abryt
                      </button>
                    </span>
                  </dd>
                </div>
              )}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Job title</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">Human Resources Manager</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Endre/Oppdater
                    </button>
                  </span>
                </dd>
              </div>
            </dl>
          </form>
        </div>
      </div>

    </SettingsLayout>
  )
}

export default UserProfile
