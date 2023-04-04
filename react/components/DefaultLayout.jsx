import { Link,Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout(){

    const {user,token }=useStateContext()
    if(!token){
        return <Navigate to='/login'/>
    }
    return(
        <div id="defaultLayout">
            <aside>
            <Link to='/Dashboard'>Dashboard</Link>
                <Link to='/users'>Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
        
    )
}