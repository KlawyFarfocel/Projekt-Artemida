import {createBrowserRouter, Navigate} from "react-router-dom";
import Signup from "../views/Signup";
import Users from "../views/Users";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import { Children } from "react";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import Dashboard from "../views/Dashboard";

const router=createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/Users',
                element: <Users />
            },
            {
                path: '/',
                element: <Navigate to='/Users'/>
            },
            {
                path: '/Dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])
export default router;