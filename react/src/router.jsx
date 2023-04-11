import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/GuestLayout";
import Login from "./components/Login";
import UserLayout from "./views/UserLayout";
import Dashboard from "./components/Dashboard";

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
            }
        ]
    },
])
export default router;