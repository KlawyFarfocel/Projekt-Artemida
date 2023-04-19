import { Navigate } from "react-router-dom";
import { useStateContext} from "../contexts/ContextProvider";


export default function Logout(){
    const { setCurrentUser, setUserToken } = useStateContext();
    setUserToken();
    setCurrentUser();
    return(
        <Navigate to={"/"}/>
    )
}