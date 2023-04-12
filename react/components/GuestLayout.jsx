import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout(){
    if(token){
        return <Navigate to ="/"/>
    }
    return(
        <div className="login-signup-form animated fadeInDown">      
            <div className="form">
            <Outlet/>
            </div>
        </div>
    )
}