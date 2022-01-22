import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from "../features/userSlice";
import { useDispatch } from 'react-redux';
import { setMsg } from '../features/messageSlice';
import { useHistory } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleClick = () => {
        document.querySelector('input#navi-toggle').checked = false;  //I built my navbar witha checkbox using the :checked pseudoselector. To ensure it close afdter user clicks a link, set checked to false
    }

    const handleLogout = () => {
        window.sessionStorage.removeItem('userID');  //Since i am storing state in session storage I need to make sure to remove those before logging out.
        window.sessionStorage.removeItem('name');
        dispatch(setMsg({ msg: 'You have been logged out', err: false }));  //Set message state in store to display upon redirect
        dispatch(logout()); //Dispatch logout action to store
        history.push('/login');  //redirect user back to login
        
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
                    <li className="navigation__item"><Link onClick={ handleClick } to="/awakening" className="navigation__link"><span>04</span>Upon Awakening</Link></li>
                    <li className="navigation__item"><Link onClick={ handleClick } to="/login" className="navigation__link"><span>05</span>ChatRoom</Link></li>
                    <li className="navigation__item navigation__link"><Link onClick={ handleLogout } to="#" className="navigation__link"><span>06</span>Logout</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
