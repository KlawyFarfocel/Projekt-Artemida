import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/GuestLayout";
import Login from "./components/Login";
import UserLayout from "./views/UserLayout";
import Dashboard from "./components/Dashboard";
import ObwodMap from "./components/ObwodMap";
import UserData from "./components/UserData";
import Permissions from "./components/Permissions";
import Anno from "./components/Anno";
import Logout from "./components/Logout";
import Donate from "./components/Donate";
import StatsView from "./components/StatsView.jsx";

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
            },
            {
                path:"/Anno",
                element:<Anno/>
            },
            {
                path:"/Logout",
                element:<Logout/>
            },
            {
                path:"/Skladki",
                element:<Donate/>
            },
            {
                path:"/Stats",
                element:<StatsView/>
            }
        ]
    },
])
export default router;