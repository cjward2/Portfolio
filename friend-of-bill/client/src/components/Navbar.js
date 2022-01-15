import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const handleClick = () => {
        document.querySelector('input#navi-toggle').checked = false;
    }

    return (
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />
            <label className="navigation__button" htmlFor="navi-toggle">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <li className="navigation__item"><Link onClick={ handleClick } to="/dashboard" className="navigation__link"><span>01</span>Home</Link></li>
                    <li className="navigation__item"><Link onClick={ handleClick } to="/inventory" className="navigation__link"><span>02</span>Inventory</Link></li>
                    <li className="navigation__item"><Link onClick={ handleClick } to="/reviews" className="navigation__link"><span>03</span>Nightly Reviews</Link></li>
                    <li className="navigation__item"><Link onClick={ handleClick } to="/login" className="navigation__link"><span>04</span>Upon Awakening</Link></li>
                    <li className="navigation__item"><Link onClick={ handleClick } to="/login" className="navigation__link"><span>05</span>ChatRoom</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
