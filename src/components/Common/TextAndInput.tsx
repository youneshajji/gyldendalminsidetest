import React from "react"

export const ListObject = ({ text, className }) => {
  return (
    <li>
      <div className="relative">
        <span
          className={"absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 " + className}
          aria-hidden="true"
        ></span>
        <div className="relative flex space-x-3">
          <p>{text}</p>
        </div>
      </div>
    </li>
  )
}
export const InputObject = ({ refValue, defaultValue, onChange, id, type, autoComplete, placeholder }) => {
  return (
    <div className="relative">
      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
      <div className="relative flex space-x-3">
        <input
          ref={refValue}
          type={type}
          id={id}
          className="rounded text-md h-10"
          defaultValue={defaultValue}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export const ListTextDesc = ({ text }) => {
  return (
    <li>
      <div className="relative pb-2">
        <div className="relative flex space-x-3">
          <p className="text-md font-semibold">{text}</p>
        </div>
      </div>
    </li>
  )
}
