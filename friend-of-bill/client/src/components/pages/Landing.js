import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">Welcome Friend of Bill</span>
                    <span className="heading-primary--sub">You don't have to suffer anymore</span>
                </h1>
                </div>
            <div className="landing__button-group">
                <a className="custom-btn btn--white btn--animated" href="/register">Register</a>
                <a className="custom-btn btn--white btn--animated" href="/login">Login</a>
            </div>
            
        </div>
    )
}

export default Landing
