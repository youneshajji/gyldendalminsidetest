import React, { Component, useState, useEffect } from "react"
import { navigate, Link } from "gatsby"
import SearchableDropDown from "../DropDowns/SearchableDropdown"
import { fetchApi } from "../Common/WebApi-utils"
import { ThemeConsumer } from "styled-components"
import axios from "axios"
import { useInput } from "../CustomHooks/useInput"

const Schools = [
  {
    id: "1",
    name: "Ammerud skole",
  },
  {
    id: "2",
    name: "Ammerud Ungdomsskole",
  },
  {
    id: "3",
    name: "Ammerud VGS",
  },
]

const DisplayName = ({ user }) => {
  const [editMode, setEditMode] = useState("default")
  return editMode == "name" ? (
    <div className="relative flex space-x-4">
      <input type="text" className="rounded text-md h-10" defaultValue={user.firstname} />
      <input type="text" className="rounded text-md h-10" defaultValue={user.lastname} />
      <button
        onClick={() => setEditMode("default")}
        className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
      >
        Abryt
      </button>
      <button
        onClick={() => setEditMode("default")}
        className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
      >
        Lagre
      </button>
    </div>
  ) : (
      <div className="relative flex space-x-5">
        <span>{user.firstname + " " + user.lastname}</span>
        <span
          className="text-md text-indigo-500 h-6 px-0 border-indigo-500 w-12 border-b cursor-pointer"
          onClick={() => setEditMode("name")}
        >
          Endre
      </span>
      </div>
    )
}
// const EditMode = ({ state }) => {
//   const [editMode, setEditMode] = useState("default")
//   const [info, setInfo] = useState("")

//   if (state == "phone") {
//     setInfo(user.phone)
//   }
//   if (state == "email") {
//     setInfo(user.email)
//   }
//   if (state == "school") {
//     setInfo(user.school.schoolName)
//   }

//   return editMode == state ? (
//     <div className="relative flex space-x-5">
//       <input type="text" defaultValue={user.fname + " " + user.lname} />
//       <button
//         onClick={() => setEditMode("default")}
//         className="h-10 m-2 underline bg-transparent text-black font-semibold hover:text-gray py-2 px-6 borde-none"
//       >
//         Abryt
//       </button>
//       <button
//         onClick={() => setEditMode("default")}
//         className="h-10 m-2 bg-carmine-500 hover:bg-carmine-800 text-white font-semibold hover:text-white py-2 px-6 border border-red-500 rounded-2xl"
//       >
//         Lagre
//       </button>
//     </div>
//   ) : (
//     <div className="relative flex space-x-5">
//       <span>{info}</span>
//       <span className="text-md text-indigo-500 underline cursor-pointer" onClick={() => setEditMode(state)}>
//         Endre
//       </span>
//     </div>
//   )
// }

const ConfirmInfo = ({ user }) => {
  console.log(user.mobilephone)
  const [editMode, setEditMode] = useState("default")
  const [value, setValue] = useState(null)
  const [check, setCheck] = useState(false)
  const [phoneOk, setPhoneOk] = useState(false)
  const [empty, setEmpty] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState(false)

  const [profile, setProfile] = useState({
    email: "",
    firstname: "",
    lastname: "",
    birthdate: new Date(),
    gender: "",
    address: "",
    postalCode: "",
    city: "",
    countryLabel: "",
    countryValue: "",
    mobile: "",
  })

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")

  // const onVerify = () => {
  //   // TODO: check if assessmentCopy or SampleAccess from url param, navigate to the respective page
  //   return navigate("/minside/vurderingseksemplar")
  // }

  return (
    <section aria-labelledby="userprofile" className="mx-auto lg:max-w-2xl sm:max-w-sm ">
      <div className=" bg-white px-8 py-5 shadow sm:rounded-lg sm:px-6 justify-self-center">
        <div className="mt-6 flow-root">
          <h1 className="text-3xl font-bold pb-5">Bekreft opplysningene</h1>
          <span className="text-md pb-5">
            Før du kan gå videre må du se over opplysningene dine. Er de ikke oppdatert, må du endre informasjonen før
            du bekrefter nederst på siden
          </span>
          <ul className="-mb-5 ">
            <div className="border-b space-y-4">
              <li>
                <div className="relative space-y-2">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <h2 className="text-md font-semibold">Navn</h2>
                  <div>
                    <DisplayName user={user}></DisplayName>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative space-y-2">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <h2 className="text-md font-semibold">Mobil</h2>
                  <div className="relative flex space-x-5">
                    {editMode == "phone" ? (
                      <div className="relative flex space-x-5">
                        <input
                          {...bindEmail}
                          type="text"
                          pattern="^[a-zA-Z0-9!#$%&'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$"
                          // onChange={(e) => this.setEmail(e)}
                          // onKeyPress={(e) => handleKeyPress(e)}
                          name="verify_email"
                          id="verify_email"
                          autoComplete="verify_email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="you@example.com"
                          minLength={3}
                          defaultValue={user.mobilephone}
                          onChange={() => setPhoneOk(true)}
                        />
                        {phoneOk ? (
                          <div>
                            {" "}
                            <button
                              onClick={() => setEditMode("default")}
                              className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                            >
                              Avbryt
                            </button>
                            <button
                              type="submit"
                              className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                            >
                              Lagre
                            </button>{" "}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                        <div className="relative flex space-x-5">
                          <span>{user.uUID}</span>
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
                      <div className="relative flex space-x-5">
                        <input type="text" className="rounded text-md h-10" placeholder="Ny e-post" name="email" />
                        <button
                          onClick={() => setEditMode("default")}
                          className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                        >
                          Abryt
                        </button>
                        <button
                          type="submit"
                          className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                        >
                          Lagre
                        </button>
                      </div>
                    ) : (
                        <div className="relative flex space-x-5">
                          <span>{user.emailaddress1}</span>
                          <span
                            className="text-md text-indigo-500 h-6 px-0 border-indigo-500 w-12 border-b cursor-pointer"
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
                    {editMode == "school" ? (
                      <div>
                        <div className="flex space-x-5">
                          <div>
                            <SearchableDropDown
                              options={Schools}
                              id="id"
                              label="name"
                              prompt="Velg skole..."
                              value={value}
                              onChange={(val) => setValue(val)}
                            />
                          </div>
                          <button
                            onClick={() => setEditMode("default")}
                            className="h-9 text-black hover:text-gray px-2 border-black w-15 border-b"
                          >
                            Abryt
                          </button>
                          <button
                            onClick={() => setEditMode("default")}
                            className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
                          >
                            Lagre
                          </button>
                        </div>
                        <p className="pt-4 text-xs italic">
                          {" "}
                          Informasjonen er hentet fra Feide. Stemmer ikke skolen? <br /> Ta kontakt med din lokale
                          brukerstøtte hos Feide for å oppdatere til riktig skole{" "}
                        </p>
                      </div>
                    ) : (
                        <div className="relative flex space-x-5">
                          <span>{Schools[0].name}</span>
                          <span
                            className="text-md text-indigo-500 h-6 px-0 border-indigo-500 w-12 border-b cursor-pointer"
                            onClick={() => setEditMode("school")}
                          >
                            Endre
                        </span>
                        </div>
                      )}
                  </div>
                </div>
              </li>{" "}
              <li>
                <div className="flex mt-6 pb-4 ">
                  <label className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      className="form-checkbox h-7 w-7 text-carmine-500 rounded "
                      onChange={() => {
                        setCheck(!check)
                      }}
                    />
                    <span className="ml-2">Jeg bekrefter at de registrerte opplysningene er korrekte</span>
                  </label>
                </div>
              </li>
            </div>

            <li>
              <div className="flex justify-start justify-end">
                <button
                  onClick={() => (window.location.href = "https://gyldendal.no")}
                  className="h-10 m-2 underline bg-transparent text-black hover:text-gray py-2 px-6 border-none"
                >
                  Abryt
                </button>
                <Link to="/minside/vurderingseksemplar">
                  {check ? (
                    <button className="h-10 m-2 bg-carmine-500 hover:bg-carmine-800 text-white font-semibold hover:text-white py-2 px-6 border border-red-500 rounded">
                      Bekreft
                    </button>
                  ) : null}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ConfirmInfo
