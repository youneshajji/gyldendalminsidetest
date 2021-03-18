import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import Alert from "../Alerts/AlertCustom"
import { UserContext } from "./UserContext"
import { aquireAccessToken, SignOut } from "./AuthService"
import { Link } from "gatsby"
// import SidebarMyPage from "../Sidebar/SidebarMyPage"
import SettingsLayout from "../Layout/SettingsLayout"
import { webApi } from "./ApiEndpoints"

const ChangePassword = () => {
  const { user, setUser } = useContext(UserContext)

  const [alert, setAlert] = useState({ variant: "", alertText: "", showAlert: false })
  const [isSaving, setisSaving] = useState(false)
  const [oldPassword, setoldPassword] = useState("")
  const [newPassword, setnewPassword] = useState("")

  useEffect(() => {}, [])

  const setOldPassword = (e) => {
    setoldPassword(e.target.value)
  }

  const setNewPassword = (e) => {
    setnewPassword(e.target.value)
  }

  const onSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (oldPassword === "") {
      setisSaving(false)
      setAlert((prevState) => ({
        ...prevState,
        showAlert: true,
        variant: "danger",
        alertText: "Oppgi gammelt passord.",
      }))
      return
    }

    const re = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&£*\-_+=[\]{}|\\:',?/`~"();!]|\.(?!@)){8,16}$/

    if (!re.test(newPassword)) {
      setisSaving(false)
      setAlert((prevState) => ({
        ...prevState,
        showAlert: true,
        variant: "danger",
        alertText:
          "Passordet må være mellom 8 og 64 tegn. Passordet må ha minst 3 av følgende: en liten bokstav, en stor bokstav, et tall, et symbol.",
      }))
      return
    }

    setisSaving(true)
    setAlert((prevState) => ({
      ...prevState,
      showAlert: false,
      variant: "danger",
      alertText: "",
    }))

    await axios
      .patch(
        webApi + "/IdentitiesTest/passwords",
        {
          CurrentPassword: oldPassword,
          NewPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await aquireAccessToken()),
          },
        }
      )
      .then(async () => {
        setAlert((prevState) => ({
          ...prevState,
          showAlert: true,
          variant: "success",
          alertText: "Passordet er endret",
        }))
        // SignOut()
      })
      .catch(async (error) => {
        if (error.message === "Network Error") {
          setisSaving(false)
          setAlert((prevState) => ({
            ...prevState,
            showAlert: true,
            variant: "danger",
            alertText: error.message,
          }))
          return
        }
        if (error.message !== "Network Error")
          if (error.response.status === 400) {
            setisSaving(false)
            setAlert((prevState) => ({
              ...prevState,
              showAlert: true,
              variant: "danger",
              alertText: "Gammelt passord er ikke korrekt - Vil du skape nytt?",
            }))
          } else {
            setisSaving(false)
            setAlert((prevState) => ({
              ...prevState,
              showAlert: true,
              variant: "danger",
              alertText: error.message,
            }))
          }
      })
      .finally(function () {
        // always executed
      })
  }

  return (
    <>
      <SettingsLayout>
        <div>
          <div className="profile-content section">
            <div style={alert.showAlert ? {} : { display: "none" }}>
              <Alert variant={alert.variant} text={alert.alertText} />
            </div>
            <div>
              <div className="ml-auto mr-auto">
                <div className="name text-center" style={user.userName !== "" ? {} : { display: "none" }}>
                  <h4 className="text-center">{user.userName}</h4>
                </div>
                <div id="api">
                  <form className="register-form" id="localAccountForm" aria-label="Nytt passord" autoComplete="on">
                    <div className="error pageLevel" aria-hidden="true" role="alert" style={{ display: "none" }}>
                      <p />
                    </div>
                    <div>
                      <label htmlFor="oldpassword" className="block text-sm font-medium text-gray-700">
                        Gammelt passord
                      </label>
                      <div className="error itemLevel" aria-hidden="true" style={{ display: "none" }}>
                        <p role="alert" />
                      </div>
                      <div className="mt-1">
                        <input
                          onChange={(e) => setOldPassword(e)}
                          type="password"
                          name="Password"
                          id="oldpassword"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Gammelt Passord"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700">
                        Nytt passord
                      </label>
                      <div className="error itemLevel" aria-hidden="true" style={{ display: "none" }}>
                        <p role="alert" />
                      </div>
                      <div className="mt-1">
                        <input
                          onChange={(e) => setNewPassword(e)}
                          type="password"
                          name="Password"
                          id="newpassword"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Nytt Passord"
                        />
                      </div>
                    </div>
                    <div className="working" />
                    <div className="btn-round">
                      <button
                        id="send"
                        onClick={(e) => onSend(e)}
                        tabIndex={1}
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <div style={isSaving ? {} : { display: "none" }} className="uil-reload-css reload-small mr-1">
                          <div />
                        </div>
                        Lagre
                      </button>
                    </div>
                  </form>
                </div>
                <hr />
                <div>
                  <h5>Dersom du har glemt ditt gamle passord:</h5>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Link to="/minside/glemtpassord">ForgottenPassword?</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SettingsLayout>
    </>
  )
}

export default ChangePassword
