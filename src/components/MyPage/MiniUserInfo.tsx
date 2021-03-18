import React, { useState, useEffect, useMemo, useRef } from "react"
import { fetchApi, patchApi } from "../Common/WebApi-utils"
import { EditButton, SaveButton, CancelButton, DisabledButton } from "../Common/Buttons"
import { webApi } from "../Security/ApiEndpoints"

const Users = [
  {
    fname: "Ola",
    lname: "Normann",
    email: "ola.normann@ammerudskole.no",
    phone: "+4798765432",

    school: {
      schoolName: "Ammerud Skole",
      address: "Ammerudveien 49, 0958 Oslo",
      subject: "Matematikk",
      grade: "4. klasse",
    },
  },
]

const ListObject = ({ text }) => {
  return (
    <li>
      <div className="relative pb-4">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <p>{text}</p>
        </div>
      </div>
    </li>
  )
}
const InputObject = ({ refValue, defaultValue }) => {
  return (
    <li>
      <div className="relative pb-4">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <input ref={refValue} type="text" id="fname" className="rounded text-md h-10" defaultValue={defaultValue} />
        </div>
      </div>
    </li>
  )
}

const MiniUserInfo = () => {
  const [user, setUser] = useState([])
  const [feide, setFeide] = useState(false)
  const [editMode, setEditMode] = useState("default")
  const inputRef = useRef({})

  const [account, setAccount] = useState({})
  const [userInfo, setUserInfo] = useState({
    emailaddress1: "",
    firstname: "",
    lastname: "",
    fullname: "",
    mobilephone: "",
  })

  useEffect(() => {
    window.sessionStorage.getItem("usertype") === "feide" ? setFeide(true) : setFeide(false)
    fetchApi(webApi + "/GyldendalContacts")
      .then((response) => {
        setUser(response.data)
        setAccount(response.data.account)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useMemo(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      emailaddress1: user.emailaddress1,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      mobilephone: user.mobilephone,
    }))
  }, [user])
  const updateInfo = () => {
    let data = {}

    const fnameValue = inputRef.current["first_name"].value
    const lnameValue = inputRef.current["last_name"].value
    const phoneValue = inputRef.current["phone"].value
    const emailValue = inputRef.current["email"].value

    data = {
      firstname: fnameValue,
      lastname: lnameValue,
      mobilephone: phoneValue,
      email: emailValue,
    }
    setUserInfo((prevState) => ({
      ...prevState,
      firstname: fnameValue,
      lastname: lnameValue,
      fullname: fnameValue + " " + lnameValue,
      mobilephone: phoneValue,
      emailaddress1: emailValue,
    }))

    patchApi(webApi + "/GyldendalContacts", data)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    document.getElementById("headerName").textContent = fnameValue + " " + lnameValue
    setEditMode("default")
  }
  return (
    <section aria-labelledby="userprofile" className="lg:col-start-1 lg:col-span-2 pb-4">
      <div className="bg-white px-8 py-5 sm:rounded-lg sm:px-6 ">
        <div className="flex justify-center">
          <img
            className="inline-block h-20 w-20 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=7wGlKUaDVn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="mt-6 flow-root">
          <ul className="-mb-5">
            <div className="">
              <div className="border-b pb-4">
                <li>
                  <div className="relative pb-4">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex space-x-3">
                      <div className="flex justify-between">
                        <p className="text-lg font-bold text-black">Profil</p>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-end space-x-4">
                        {editMode === "profile" ? (
                          <CancelButton cancelMethod={setEditMode} cancelMode="default" />
                        ) : (
                          <EditButton setEditMode={setEditMode} editMode="profile" />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                {editMode === "profile" ? (
                  <div className="relative">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative px-2 space-y-2">
                      <h3 className="text-md ">Fornavn</h3>
                      <input
                        ref={(el) => (inputRef.current["first_name"] = el)}
                        className="rounded text-md h-10 border-black border w-full px-3"
                        defaultValue={userInfo.firstname}
                      />
                      <h3 className="text-md ">Etternavn</h3>
                      <input
                        ref={(el) => (inputRef.current["last_name"] = el)}
                        className="rounded text-md h-10 border-black border w-full px-3"
                        defaultValue={userInfo.lastname}
                      />
                      <h3 className="text-md ">Mobilnummer</h3>
                      <input
                        ref={(el) => (inputRef.current["phone"] = el)}
                        className="rounded text-md h-10 border-black border w-full px-3"
                        defaultValue={userInfo.mobilephone}
                      />
                      <h3 className="text-md ">E-post</h3>
                      <input
                        ref={(el) => (inputRef.current["email"] = el)}
                        className="rounded text-md h-10 border-black border w-full px-3"
                        defaultValue={userInfo.emailaddress1}
                      />

                      <div className="text-right pt-2">
                        <SaveButton id="saveMiniUserProfile" onClick={updateInfo} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <ListObject text={userInfo.firstname + " " + userInfo.lastname} />
                    <ListObject text={userInfo.emailaddress1} />
                    <ListObject text={userInfo.mobilephone} />
                  </>
                )}
              </div>

              <div className="pt-8">
                <li>
                  <div className="relative pb-4">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex space-x-3">
                      <div className="flex justify-between">
                        <p className="text-lg font-bold text-black">Skole</p>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-end space-x-4">
                        {window.sessionStorage.getItem("usertype") === "feide" ? null : (
                          <EditButton setEditMode={setEditMode} editMode="school" />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-4">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex space-x-3">
                      <p>{Users[0].school.schoolName}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-4">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex space-x-3">
                      <p>{Users[0].school.address}</p>
                    </div>
                  </div>
                </li>
                {feide ? (
                  <>
                    <li>
                      <div className="relative pb-4">
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div className="relative flex space-x-3">
                          <p>{Users[0].school.subject}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-4">
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div className="relative flex space-x-3">
                          <p>{Users[0].school.grade}</p>
                        </div>
                      </div>
                    </li>
                  </>
                ) : null}
              </div>
            </div>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default MiniUserInfo
