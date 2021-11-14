import { useRef } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import './SignupScreen.css';

const SignupScreen = () => {
    const emailRef = useRef(null); 
    const passwordRef = useRef(null); 
    const history = useHistory();

    const register = (event) => {
        event.preventDefault();

        //When register button is clicked, fire  off firebase auth function passing in current Ref to email and password
        auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
            console.log(authUser)
            history.push('/')
        })
        .catch(err => {
            alert(err.message)
        })
    }

    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(authUser => {
            console.log(authUser)
            history.push('/');
        })
        .catch(err => {
            alert(err.message)
        })
    }

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={ emailRef } placeholder="Email" type="email" />
                <input ref={ passwordRef } type="password" placeholder="Password"/>
                <button type="submit" onClick={ signIn }>Sign In</button>
                <h4>    
                 <span className="signupScreen__gray">New to Netflix? </span>
                    <span className="signupScreen__link" onClick={ register }>Sign Up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignupScreen
