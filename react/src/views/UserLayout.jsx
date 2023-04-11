import { Navigate, Outlet, useNavigate } from "react-router-dom"
import NavbarReact from "../components/NavbarReact"
import { useStateContext } from "../contexts/ContextProvider"

export default function UserLayout(){
    const {user,userToken}=useStateContext()
    console.log(!userToken)
    return(

        <div className="h-100 vh-100 d-flex flex-column">
        {!userToken &&(
            <Navigate to="/Login"/>
        )}
            <NavbarReact> </NavbarReact>
            <Outlet/>
        </div>
    )
}