import { Navigate, Outlet, useNavigate } from "react-router-dom"
import NavbarReact from "../components/NavbarReact"
import { useStateContext } from "../contexts/ContextProvider"

export default function UserLayout(){
    const {user,userToken}=useStateContext()
    console.log(!userToken)
    return(
        <>
            {!userToken &&(
                <Navigate to="/Login"/>
            )}
            <NavbarReact> </NavbarReact>
            <Outlet/>
        </>
    )
}