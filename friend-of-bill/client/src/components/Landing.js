import React from 'react';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            <div className="landing__button-group">
                <h1 className="landing__heading-primary">Welcome Friend of Bill</h1>
                <a className="landing__button-group--login" href="/login">Login</a>
                <a className="landing__button-group--register" href="/register">Register</a>
            </div>
            
        </div>
    )
}

export default Landing
