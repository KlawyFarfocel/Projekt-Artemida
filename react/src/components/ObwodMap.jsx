
import React, { useRef } from "react";
import "./css/ObwodMap.css"
import OffcanvasInfo from "./offcanvasInfo";

const PropText=[
    {"Numer":"1"},
    {"Zarządca":"Jan Nowak"},
    {"Dzierżawca":"BÓBR Nowy Sącz"},
    {"Powierzchnia obwodu":"69420 Ha"},
    {"Powierzchnia leśna":"21375 Ha"},
    {"Uchwała":"24/11/25/25/ICK/u/2021"}
]
let xd=false;
export default function ObwodMap(){

    return(
        <>
             <OffcanvasInfo toggleName="Obwód" props={PropText}/>
            <div className=" h-100 d-flex align-items-center justify-content-center">
            </div> 
        </>
    )
}