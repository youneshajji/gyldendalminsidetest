import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

const PublicRoute = ({ component: Component, location, ...rest }) => {
  const username = window.sessionStorage.getItem("gatsbyUser")

  if (username !== null && username !== "") {
    // console.log("username : " + username)
    navigate(`/minside/innstillinger/brukerprofil`)
    return null
  }

  return <Component {...rest} />
}

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PublicRoute
