import { useState } from 'react'
import { controlLogin, Message } from '../Interceptor/datis'
function Login() {
    const [alerts, setAlerts] = useState({text: "", visible: false})
    const [cfail, setCFail] = useState(0)
    const [lgInfo, setLgInfo] = useState({
        username: "",
        password: ""
    })
    const submit = e => {
        e.preventDefault()
        controlLogin(lgInfo.username, lgInfo.password).then(data => {
            const res = data.response
            if(res != undefined && res.status == 500){
                setAlerts({visible: true, text: res.data.detail})
                setCFail(c => c + 1)
            } else {
                window.location.reload()
            }
        })
    }
    return ( 
        <main className="form-signin w-25 mt-5 m-auto">
            {alerts.visible ? <Message text={alerts.text} cfail={cfail}/> : ""}
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 text-center fw-bold text-capitalize">sign in</h1>
                <div className="form-floating">
                    <input type="text" className="form-control"
                    onChange={e => setLgInfo({...lgInfo, username: e.target.value})} 
                    id="floatingInput" 
                    placeholder="username"/>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" 
                    onChange={e => setLgInfo({...lgInfo, password: e.target.value})} 
                    id="floatingPassword"  
                    placeholder="password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-warning" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login