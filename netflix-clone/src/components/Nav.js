import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const [show, setShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    useEffect(() => {
        //Set up listener to scroll event
        window.addEventListener("scroll", transitionNavBar);
        //Use Effect cleanup
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
            <img onClick={ () => history.push('/') } className="nav__logo" src="/images/netflix-logo-trans.png" alt="Netflix Logo" />
            <img onClick={ () => history.push('/profile') } className="nav__avatar" src="/images/Netflix-avatar.png" alt="Netflix avatar" />
            </div>
        </div>
    )
}

export default Nav
