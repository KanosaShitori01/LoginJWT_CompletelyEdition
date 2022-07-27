import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { dataUser } from '../Interceptor/datis'
import { controlLogout } from '../Interceptor/datis'
function Home() {
    const [data, setData] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        dataUser().then(data => {
            if(data != null){
                setData(data.data.username)
            } else setData("Guest")
        })
    }, [])
    useEffect(()=>{
        if(location.pathname == "/logout"){
            controlLogout().then(lg => {
              if(lg.status == 200) {
                navigate("/", {replace:true})
                window.location.reload()
              }
            })
        }
    }, [useLocation().pathname])
    return (
        <main className="d-flex home text-center">
            <div className="px-3">
                <h1 className='text-capitalize'>Welcome to home.</h1>
                <p className="fw-bold lead">Really glad to see you again, {data}</p>
            </div>
        </main>
    )
}

export default Home