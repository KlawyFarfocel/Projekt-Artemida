import { useStateContext } from "../contexts/ContextProvider";
import OffcanvasReact from "./offcanvas"

function NavbarReact(){
    const {user,userToken}=useStateContext()
    const menu=[
        {"name":"polowania","href":"#"},
        {"name":"moje uprawnienia","href":"#"},
        {"name":"mapa okręgów","href":"#"},
        {"name":"mój obwód łowiecki","href":"#"},
        {"name":"roczny plan łowiecki","href":"#"},
        {"name":"ogłoszenia","href":"#"},
        {"name":"moje statystyki","href":"#"},
        {"name":"składki","href":"#"},
    ];
    const userOffcanvas=[
        {name:"Dane konta","href":"#"},
        {name:"Wyloguj się","href":"#"},
    ]
return(
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top">
        <div className="container-fluid">
            <ul className="navbar-nav d-none d-md-block">
                {userToken && (
                    <OffcanvasReact toggleName="MENU" props={menu}/>
                )}
            </ul>
            <div className="navbar-collapse collapse ">
            </div>
            <a className="navbar-brand fw-bold fs-4 flex-grow-1 text-uppercase" href="#">Projekt Artemida</a>
            <button className="navbar-toggler flex-grow-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collaps flex-grow-1 text-center" id="navbarNav">
            {userToken && (
                <ul className=" d-flex navbar-nav d-block d-md-none">
                    
                        <OffcanvasReact toggleName="MENU" props={menu}/>
                        <OffcanvasReact props={userOffcanvas} toggleName="Konto" side="right"/>
           
                </ul>
             )}
            </div>
            <div className="me-auto"></div>
            <ul className="navbar-nav  d-none d-md-block">
                {userToken && (
                    <OffcanvasReact props={userOffcanvas} toggleName="Konto" side="right"/>
                )}
            </ul>
        </div>
    </nav>
)}
export default NavbarReact