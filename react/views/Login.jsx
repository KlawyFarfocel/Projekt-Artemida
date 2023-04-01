import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
export default function Login(){
    const legitymacjaRef=useRef();
    const passRef=useRef();
    const [errors,setErrors] = useState(null);
    const {setUser,setToken}=useStateContext();
    
    const onSubmit= (e) =>{
        e.preventDefault();
        const payload={
            legitymacja: legitymacjaRef.current.value,
            password: passRef.current.value,
        }
        axiosClient.post('/login',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response=err.response;
            if(response && response.status==422){
                setErrors(response.data.errors);
            }
        })
    }
    return(
                <form onSubmit={onSubmit}>
                    <h1 className="title">Log into your account</h1>
                    {errors && 
                        <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input type="text" ref={legitymacjaRef} placeholder="Numer legitymacji" />
                    <input type="passsword" ref={passRef} placeholder="Hasło" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/Signup">Create an account</Link>
                    </p>
                </form>
    )
}