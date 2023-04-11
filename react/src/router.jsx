import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/GuestLayout";
import Login from "./components/Login";
import UserLayout from "./views/UserLayout";
import Dashboard from "./components/Dashboard";
import ObwodMap from "./components/ObwodMap";
import UserData from "./components/UserData";
import Permissions from "./components/Permissions";

const router=createBrowserRouter([
    {
        path:"/", 
        element:<Navigate to="/Login"/>
    },
    {
        path:"/",
        element:<GuestLayout/>,
        children:[
            {
                path:"/Login",
                element:<Login/>
            }
        ]
    },
    {
        path:"/",
        element:<UserLayout/>,
        children:[
            {
                path:"/Dashboard",
                element:<Dashboard/>
            },
            {
                path:"/Mapa",
                element:<ObwodMap/>
            },
            {
                path:"/UserData",
                element:<UserData/>
            },
            {
                path:"/Permissions",
                element:<Permissions/>
            }
        ]
    },
])
export default router;