import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios";
const StateContext=createContext({
    currentUser: {},
    userToken:null,
    president:false,
    cashier:false,
    secretary:false,
    huntsman:false,
    setCurrentUser: () => {},
    setUserToken:() => {},
    setPresident:()=>{},
    setCashier:()=>{},
    setSecretary:()=>{},
    setHuntsman:()=>{}
});

export const ContextProvider=({children})=>{
    useEffect(()=>{
        axiosClient.post("/CheckPrivileges",{
            userToken
        })
        .then(({data})=>{
            setPresident(data["President"])
            setSecretary(data["Secretary"])
            setHuntsman(data["Huntsman"])
            setCashier(data["Cashier"])
        })
    })

    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
     }
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [president, setPresident]=useState(false);
    const [cashier, setCashier]=useState(false);
    const [secretary, setSecretary]=useState(false);
    const [huntsman, setHuntsman]=useState(false);

    const setUserToken = (token) => {
        if (token) {
          localStorage.setItem('TOKEN', token)
          setCookie('tokenisko', token, 7);
        } else {
          localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
      }
    return(
        <StateContext.Provider 
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                president,
                setPresident,
                cashier,
                setCashier,
                secretary,
                setSecretary,
                huntsman,
                setHuntsman    
            }}
        >
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);