import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
export default function Signup(){
    const nameRef=useRef();
    const nazwiskoRef=useRef();
    const passRef=useRef();
    const passConfRef=useRef();
    const {setUser,setToken}=useStateContext();
    const onSubmit=(e)=>{
        e.preventDefault();
        const payload={
            name: nameRef.current.value,
            nazwisko: nazwiskoRef.current.value,
            password: passRef.current.value,
            password_conf: passConfRef.current.value,
        }
        axiosClient.post('/signup',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response=err.response;
            if(response && response.status==422){
                console.log(response.data.errors);
            }
        })
    }

    return(
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    <input ref={nameRef} type="imie" placeholder="Imie" />
                    <input ref={nazwiskoRef} type="nazwisko" placeholder="Nazwisko" />
                    <input ref={passRef} type="password" placeholder="Password" />
                    <input ref={passConfRef} type="password_conf" placeholder="Password confirmation" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Aldready Registered? <Link to="/Login">Sign in</Link>
                    </p>
                </form>
    )
}