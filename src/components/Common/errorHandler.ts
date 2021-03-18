import { DebugLogger } from "./Debug"

export const errorHandler = (error) => {
  let errorMessage = ""
  if (error.message) errorMessage = error.message + ". "

  if (error.response) {
    // Request made and server responded
    if (error.response.data.error) errorMessage += error.response.data.error.message
    DebugLogger("errorHandler", error.response.status)
    DebugLogger("errorHandler", error.response.headers)
  } else if (error.request) {
    errorMessage += "The request was made but no response was received"
    DebugLogger("errorHandler", error.request)
  } else {
    errorMessage += "Something happened in setting up the request that triggered an Error"
    DebugLogger("errorHandler", "Error", error.message)
  }

  return errorMessage
}
