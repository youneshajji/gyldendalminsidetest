import React from "react"

// Source for styling: https://tailwindui.com/components/minsidelication-ui/feedback/alerts

const Alert = (props) => {
  const [showAlert, setShowAlert] = React.useState(true)

  let color = "green"

  if (props.variant === "danger") color = "red"
  if (props.variant === "warning") color = "orange"
  if (props.variant === "success") color = "green"
  if (props.variant === "info") color = "blue"

  return (
    <>
      {showAlert ? (
        <div className="rounded-md bg-black-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-black-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={color}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-black-800">Obs!</h3>
              <div className="mt-2 text-sm black-red-700">
                <p>
                  <b className="capitalize">{props.text}</b>
                </p>
              </div>
              <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                onClick={() => setShowAlert(false)}
              >
                <span>×</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Alert
