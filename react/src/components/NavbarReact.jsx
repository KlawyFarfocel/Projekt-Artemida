import { useStateContext } from "../contexts/ContextProvider";
import OffcanvasReact from "./offcanvas"
import "./css/NavbarReact.css"
function NavbarReact(){
    const {user,userToken, setUserToken}=useStateContext()
    const menu=[
        {"name":"polowania","href":"#"},
        {"name":"moje uprawnienia","href":"/permissions"},
        {"name":"mapa okręgów","href":"/mapa"},
        {"name":"mój okręg łowiecki","href":"/HunterDistrict"},
        {"name":"moje koło łowieckie","href":"/HunterClub"},
        {"name":"roczny plan łowiecki","href":"#"},
        {"name":"ogłoszenia","href":"/Anno"},
        {"name":"moje statystyki","href":"/Stats"},
        {"name":"składki","href":"/Skladki"},
    ];
    const userOffcanvas=[
        {name:"Dane konta","href":"/UserData"},
        {name:"Wyloguj się","href":"/Logout"},
    ]
return(
    <nav className="navbar navbar-dark navbar-expand-md bg-dark sticky-top">
        <div className="container-fluid">
            <ul className="navbar-nav d-none d-md-block">
                {userToken && (
                    <OffcanvasReact toggleName="MENU" props={menu}/>
                )}
            </ul>
            <div className="navbar-collapse collapse ">
            </div>
            <a className="navbar-brand fw-bold fs-4 flex-grow-1 text-center text-uppercase" href="#">Projekt Artemida</a>
            <button className="navbar-toggler flex-grow-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-grow-1 text-center" id="navbarNav">
            {userToken && (
                <ul className=" d-flex navbar-nav d-block d-sm-none">
                    
                        <OffcanvasReact toggleName="MENU" props={menu}/>
                        <OffcanvasReact props={userOffcanvas} toggleName="Konto" side="right"/>
           
                </ul>
             )}
            </div>
            <div className="me-auto"></div>
            <ul className="navbar-nav  d-none d-sm-block">
                {userToken && (
                    <OffcanvasReact props={userOffcanvas} toggleName="Konto" side="right"/>
                )}
            </ul>
        </div>
    </nav>
)}
export default NavbarReact