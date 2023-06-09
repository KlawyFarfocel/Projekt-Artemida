
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./css/offcanvas.css";
import { Link } from 'react-router-dom';
function OffcanvasReact({side="left",toggleName="", ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var placement="";
    if(side==="left"){
      placement="start"
    }else if(side==="right"){
      placement="end"
    }
    
    return (
      <>
        <button className="navbar-toggler d-block" type="button"  onClick={handleShow}>
        {side==="right" && <i className="bi bi-caret-left-fill"></i>}
        <span className='text-white'>{toggleName}</span>
        {side==="left" && <i className="bi bi-caret-right-fill"></i>}
        </button>
        <Offcanvas placement={placement} scroll={false} className={"bg-dark text-white"} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title className={"text-center text-uppercase mx-auto fs-3 fw-bold"}>{toggleName}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mx-auto overflow-auto">
            <ul key={"OffcanvasReactKey"} className='list-group mx-auto overflow-visible'>
                    {props.props.map((value,key)=>
                      <React.Fragment key={key}>
                        <Link key={value} to={value.href} className='text-white fw-bold text-decoration-none'>
                          <li key={value} className='list-group-item bg-dark text-center text-white text-uppercase fs-4'>{value.name}</li>
                        </Link>
                        <hr key={key+value}  className='text-divider w-100'/>
                      </React.Fragment>
                    )}
                </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default OffcanvasReact;