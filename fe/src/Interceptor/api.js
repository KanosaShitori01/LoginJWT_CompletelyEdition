import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/"
let refresh = false
axios.interceptors.response.use(resp => resp, async err => {
    if(err.response.status == 401 && !refresh){
        refresh = true
        const response = await axios.post("refresh", {}, {withCredentials: true})
        if(response.status == 200){
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`
            return axios(err.config)
        }
    }
    refresh = false
    return err
})
// refresh = false
// return err})
// axios.interceptors.response.use(resp => resp, err => controlInter(err))