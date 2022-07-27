import {useState} from 'react'
import { useNavigate } from 'react-router'
import { controlRegister, Message } from '../Interceptor/datis'
function Register() {
    const [alerts, setAlerts] = useState({ text: "", visible: false })
    const [cfail, setCFail] = useState(0)
    const [lgInfo, setLgInfo] = useState({
        username: "",
        password: "",
        email: ""
    })
    const navigate = useNavigate()
    const submit = e => {
        e.preventDefault()
        controlRegister(lgInfo.email, lgInfo.username, lgInfo.password).then(data => {
            const res = data.response
            if (res != undefined && res.status == 400) {
                if(res.data.username !== undefined){
                    setAlerts({ visible: true, text: res.data.username[0] })
                } else if (res.data.email !== undefined){
                    setAlerts({ visible: true, text: res.data.email[0] })
                }
                setCFail(c => c + 1)
            } else {
                navigate("/login")
            }
            console.log(res)
        })
    }
    return (
        <main className="form-signin w-25 mt-5 m-auto">
            {alerts.visible ? <Message text={alerts.text} cfail={cfail}/> : ""}
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 text-center fw-bold text-capitalize">sign up</h1>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail"
                    onChange={e => setLgInfo({...lgInfo, email: e.target.value})} placeholder="email" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput"
                    onChange={e => setLgInfo({...lgInfo, username: e.target.value})} placeholder="username" />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"
                    onChange={e => setLgInfo({...lgInfo, password: e.target.value})} placeholder="password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-warning" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Register