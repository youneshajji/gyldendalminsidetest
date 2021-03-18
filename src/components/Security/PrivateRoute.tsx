import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const username = window.sessionStorage.getItem("gatsbyUser")

  if (username === "" && location.pathname !== `/minside/loginn`) {
    navigate(`/minside/loginn`)
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
