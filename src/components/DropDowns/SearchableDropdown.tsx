import React, { useRef, useState, useEffect } from "react"
import "../../assets/css/styles.css"
import { fetchApi } from "../Common/WebApi-utils"
import { webApi } from "../Security/ApiEndpoints"

const SearchableDropDown = ({ }) => {
  const [open, setOpen] = useState(false)
  const [schools, setSchools] = useState([])

  const inputRef = useRef({})
  const [query, setQuery] = useState(" ")
  const [value, setValue] = useState(null)
  useEffect(() => {
    fetchApi(webApi + "/GyldendalAccounts/search/" + value)
      .then((response) => {
        setSchools(response.data.value)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [value])
  const selectOption = (school) => {
    inputRef.current["api"].value = school
    setOpen(false)
  }

  const handleOnChange = () => {
    if (inputRef.current["api"].value === "" || inputRef.current["api"].value.length < 3) {
      setOpen(false)
    } else {
      setOpen(true)
      setValue(inputRef.current["api"].value)
    }
  }

  return (
    <div className="relative pb-4 ">
      <div className="">
        <div className="transition mt-1 relative rounded shadow-sm">
          <div className="relative">
            <input
              id="sdd"
              ref={(el) => (inputRef.current["api"] = el)}
              type="text"
              className="block w-full pr-10 sm:text-sm rounded"
              onChange={handleOnChange}
              minLength={3}
              placeholder="Velg din skole"
              autoFocus
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none ">
              <svg
                className="h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="border transition delay-150 duration-300 rounded">
            {open
              ? schools.map((school) => (
                <div
                  key={school.accountid}
                  className="pt-2 border-b ease-out duration-500 pr-4 flex cursor-pointer block selected rounded text-md h-10 hover:bg-betong-200 hover:border hover:border-indigo-500 w-full "
                  onClick={() => {
                    selectOption(school.name)
                    window.sessionStorage.setItem("schoolId", school.accountid)
                    window.sessionStorage.setItem("schoolName", school.name)
                  }}
                >
                  <p className="px-4">{school.name}</p>
                </div>
              ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchableDropDown
