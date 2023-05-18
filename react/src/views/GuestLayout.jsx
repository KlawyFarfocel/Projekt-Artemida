import { Navigate, Outlet } from "react-router-dom";
import NavbarReact from "../components/NavbarReact";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout(){
    const {user,userToken}=useStateContext()
    return(
        
        <div className="h-100 d-flex flex-column justify-content-center">
            {userToken && (
                <Navigate to="/Dashboard"></Navigate>
            )}
            <NavbarReact></NavbarReact>
            <div className=" d-flex flex-row justify-content-center">
            <Outlet/>
            </div>
        </div>
    )
}