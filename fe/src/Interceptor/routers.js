import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import axios from 'axios';
import {Route} from 'react-router'
import { Link } from "react-router-dom";
const routersThing = {
    simply: [{to: "/", text: "home"}],
    loghan: [
        {to: "/login", text: "sign in"},
        {to: "/register", text: "sign up"}
    ],
    logged: [
        {to: "/logout", text: "log out"}
    ],
    routes: [
        {path: "/", element: <Home/>},
        {path: "login", element: <Login/>},
        {path: "register", element: <Register/>}
    ],
    routes_log: [
        {path: "/", element: <Home/>},
        {path: "login", element: <Login/>},
        {path: "register", element: <Register/>},
        {path: "logout", element: <Home/>}
    ]
}
export const renderRoute = (data) => {
    return (data != "") ? 
    (data.router.map((rou, index) => 
    <Route key={index} path={rou.path} element={rou.element} 
    />)) : ""
} 
export const renderHeader = (data) => {
    return (data != "") ? 
    data.header.map((hea, i) => <Link key={i} to={hea.to} type="button" 
    className="btn btn-outline-light text-capitalize me-2">{hea.text}</Link>) : ""
}
export const routersHandle = async () => {
    let result = {
        header: [...routersThing.loghan],
        router: [...routersThing.routes]
    }
    let res = await axios.get("user")
    if(res.status == 200){
        result = {header: [...routersThing.logged], router: [...routersThing.routes_log]}         
    } 
    return result
}

