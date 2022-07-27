import axios from "axios"
import { useEffect, useRef } from "react"
export const Message = ({text, cfail}) => {
   let alertb = useRef()
   useEffect(()=>{
      alertb.current.classList.toggle("active")
      setTimeout(() => {
         alertb.current.classList.remove("active")
      }, 250);
   }, [cfail])
   return (<div ref={alertb} className="alert text-center alert-danger" role="alert">
      {text}
 </div>)
}
export const controlLogin = async (username, password) => {
   const login = await axios.post("login", 
   { username, password }, {withCredentials: true})
   return login
}
export const controlRegister = async (email, username, password) => {
   const register = await axios.post("register", 
   {username, password, email}, {withCredentials: true})
   return register
}
export const controlLogout = async () => {
   return await axios.post("logout", {}, {withCredentials: true})
}
export const dataUser = async () => {
   const user = await axios.get("user") 
   return (user.status == 200) ? user : null
}