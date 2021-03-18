import * as React from 'react';
import { useContext } from "react"
import { UserContext, userInfo} from "./UserContext"
import axios from 'axios'
import { Link, useParams } from "@reach/router"


function login(){
    const param = useParams()
    const { setUser } = useContext(UserContext)

    if(param.code){
        const sessionID = param.code
        window.sessionStorage.setItem("sessionID", sessionID.toString()) 
        
        const user = GetPublicationAccess(sessionID)
        debug.log(param.code)
        setUser(user)
    }else{
        GetPublicationAccess()
    }
    
    // // Generate URL with webapi
    // const tibetUrl = await getTibetUrl();
    
    // // Navigate to tibeturl
    
    // // callback: return_from_tibet == true
    
    // const user = GetPublicationAccess(sessionID)
    // setUser(user)

    return(
        <div>
            <h1>Redirecing to url</h1>
        </div>
    )
}

function logout(){
    const { setUser } = useContext(UserContext)
    setUser(null)
    window.sessionStorage.setItem("sessionID", "")
    window.sessionStorage.setItem("gatsbyUser", "")
    window.sessionStorage.setItem("gatsbyUserEmail", "")
    window.sessionStorage.setItem("gatsbyUserLoggedInn", "false")
    window.sessionStorage.setItem("gatsbyaccesstoken", "")
    window.sessionStorage.setItem("gatsbyaccesstokenexpiry", "")
    window.sessionStorage.setItem("gatsbyUserParentAccount", "")
    window.sessionStorage.setItem("gatsbyContactId", "")
}

function getSessionId(){
    return window.sessionStorage.getItem("sessionID")
}

function getSchool(){
    return window.sessionStorage.getItem("school")
}

/**
 * 
 * @param {string} sessionID Optional 
 * @returns a user if sessionID is defined
 */
function GetPublicationAccess(sessionID?){
    if(sessionID){
        return userInfo
    }
    //generate tiber URL
    // tiberURL = getTibetUrl()
    
    //navigate to sessionID
    // window.location.href = "https://www.google.com"

}

const getTibetUrl = async () => {
    try {
        return await axios.get('https://dog.ceo/api/breeds/list/all')
    } catch (error) {
        console.error(error)
    }
}

export default login