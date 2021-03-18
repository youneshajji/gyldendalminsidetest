// import React from "react"
// import dotenv from "dotenv"

export const DebugLogger = (source, log) => {
  if (process.env.NODE_ENV === "development") console.log("Source " + source + "Through error:" + log)
}
