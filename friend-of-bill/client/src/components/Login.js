import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from "../features/userSlice";
import { selectMessage } from '../features/messageSlice';
import { useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage';
import './Login.css';


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useSelector(selectMessage);
    console.log(message);

    const initialState = {
        email: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = event => {
        console.log('submit');
        //prevent default action of form
        event.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if(!res.ok) {
                throw new Error(`Incorrect credentials`);
            }
            return res.json();
        }).then(data => {
            if(data.err) {
                throw new Error('Error while logging in');
            }
            console.log(data);
            //Store users info in session storage so state can persist across refresh
            window.sessionStorage.userID = data.userID;
            window.sessionStorage.name = data.name;
            dispatch(login({ id: data.userID, name: data.name }));
            history.push('/dashboard');
        }).catch(err => {
            console.log('Error block' , err);
            //this is where I will display message to user
        });
        //Reset form data
        setFormData(initialState);
    }

    const handleChange = event => {
        console.log('handle change');
        setFormData({
            ...formData, //spread operator here to maintain previous data
            [event.target.name]: event.target.value  //update state with value change
        });
    }

    return (
        <div className="login">
            { message && <AlertMessage />}
            <form className="login__form" onSubmit={ handleSubmit }>
            <div className="login__form-group">
                <input type="email" className="login__form-input" placeholder="Email address" name="email" id="email" required autoComplete="off" value={ formData.email } onChange={ handleChange }/>
                <label htmlFor="email" className="login__form-label">Email address</label>
            </div>
            <div className="login__form-group">
                <input type="password" className="login__form-input" placeholder="Password" name="password" id="password" required autoComplete="off" value={ formData.password } onChange={ handleChange }/>
                <label htmlFor="password" className="login__form-label">Password</label>
            </div>
            <div className="login__form-group">
                <button type="submit" className="btn btn--green"><span>Login</span></button>
            </div>
            </form>
        </div>
    )
}

export default Login
