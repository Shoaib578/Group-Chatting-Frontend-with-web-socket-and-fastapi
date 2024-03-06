import {
    redirect,
    Navigate
  } from "react-router-dom";

const AuthRequired = ({children})=>{
    const user = localStorage.getItem('user')
    if(!user){
        

        return <Navigate to={'/login'} />
    }else{
        return children
    }
}

export default AuthRequired