import React from "react"
import { Link } from "gatsby"
import { navigate } from "@reach/router"

export const LinkButton = (link) => {
  return <Link to={link} />
}

export const DisabledButton = ({ disabledWhen, text, link, onClick }) => {
  return (
    <button
      onClick={() => {
        onClick
        navigate(link)
      }}
      disabled={disabledWhen ? false : true}
      className="h-10 m-2 bg-carmine-500 hover:bg-carmine-800 text-white font-semibold hover:text-white py-2 px-6 border border-carmine-500 rounded disabled:opacity-50 disabled:cursor-default"
    >
      {text}
    </button>
  )
}

export const CancelButton = ({ cancelMethod, cancelMode }) => {
  return (
    <span
      onClick={() => cancelMethod(cancelMode)}
      className="text-md text-black border-black w-11 p-0 h-6 border-b cursor-pointer"
    >
      Abryt
    </span>
  )
}

export const SaveButton = ({ onClick, id }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="h-10 w-15 bg-carmine-500 hover:bg-carmine-700 text-white font-semibold hover:text-white px-4 border border-red-500 rounded"
    >
      Lagre
    </button>
  )
}

export const EditButton = ({ setEditMode, editMode }) => {
  return (
    <span
      className="text-md text-indigo-500 h-6 px-0 border-indigo-500 w-12 border-b cursor-pointer"
      onClick={() => setEditMode(editMode)}
    >
      Endre
    </span>
  )
}
