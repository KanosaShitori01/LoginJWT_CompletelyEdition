import './App.css';
import Header from './Components/Header';
import { Routes, useLocation, useNavigate } from 'react-router';
import { routersHandle, renderRoute } from './Interceptor/routers';
import { useEffect, useState } from 'react';
import { controlLogout } from './Interceptor/datis';

function App() {
  const [data, setData] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{ 
    routersHandle().then(dataR => {
      setData(dataR)  
      if((location.pathname == "/login" && dataR.header.length == 1) ||
      (location.pathname == "/register" && dataR.header.length == 1)){
        navigate("/", {replace:true})
      } 
     
    })
  }, [])
  return (
    <div className="App">
      <Header data={data} />
      <Routes>
        {renderRoute(data)}
      </Routes>
    </div>
  );
}

export default App;
