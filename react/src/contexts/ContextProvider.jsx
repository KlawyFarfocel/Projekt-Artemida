import { createContext, useContext, useState } from "react";
const StateContext=createContext({
    currentUser: {},
    userToken:null,
    setCurrentUser: () => {},
    setUserToken:() => {}
});

export const ContextProvider=({children})=>{
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
            }}
        >
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);