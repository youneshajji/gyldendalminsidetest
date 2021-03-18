import axios from "axios"

import { DebugLogger } from "./Debug"
import { navigate } from "gatsby"

export const fetchApi = async (url) => {
  //TODO: if 5min to expiredate, navigate to identity api
  //var tokenexpire = window.sessionStorage.getItem("gyldendal_access_token_expire")
  // navigate(IdentityApiEndpoint + "/TibetIdentity")
  const response = axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: window.sessionStorage.getItem("gyldendal_access_token"),
    },
  })

  return response
}

export const fetchApiAnonymous = (url) => {
  const response = axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response
}

export const postApi = async (url, obj) => {
  //TODO: if 5min to expiredate, navigate to identity api
  // navigate(IdentityApiEndpoint + "/TibetIdentity")
  const response = axios.post(url, obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: window.sessionStorage.getItem("gyldendal_access_token"),
    },
  })

  return response
}

export const postApiAnonymous = (url, obj) => {
  const response = axios.post(url, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response
}

export const patchApi = async (url, obj) => {
  //TODO: if 5min to expiredate, navigate to identity api
  // navigate(IdentityApiEndpoint + "/TibetIdentity")
  const response = axios.patch(url, obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: window.sessionStorage.getItem("gyldendal_access_token"),
    },
  })

  return response
}

export const patchApiAnonymous = (url, obj) => {
  const response = axios.patch(url, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response
}
