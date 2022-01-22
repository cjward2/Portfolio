import React from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMsg, selectMessage } from '../features/messageSlice';
import AlertMessage from './AlertMessage';
import GoogleAuth from './GoogleAuth';

import './Register.css';

const Register = () => {
    const initialState = {
        name: "",
        email: "",
        password1: "",
        password2: ""
    };

    const [formData, setFormData] = useState(initialState);

    const history = useHistory();
    const dispatch = useDispatch();
    const message = useSelector(selectMessage);

    const handleSubmit = event => {
        console.log('submit');
        //prevent default action of form
        event.preventDefault();
        if(formData.password1 !== formData.password2) {
            dispatch(setMsg({ msg: 'Passwords do not match', err: true }));
            return;
        } else if(formData.password1.length < 6) {
            dispatch(setMsg({ msg: 'Password must be at least 6 characters long', err: true }));
            return;
        }
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if(!res.ok) {
                throw new Error()
            }
            return res.json();
        }).then(data => {
            console.log(data);
            if(data.err) {
                dispatch(setMsg({ msg: 'It looks like you already have an account. Please login to continue', err: true }));
                history.push('/login');  //Redirect user to login if they already have an account
                throw new Error('User already registered');
            }
            dispatch(setMsg({ msg: 'You are registered and can now login', err: false }))
            history.push('/login'); //Redirect user to login after they successfully register
        }).catch(err => {
            console.log('Error block' , err);
            //this is where I will display message to user
        });
        //Reset form data
        setFormData(initialState);
    }

    const handleChange = event => {
        setFormData({
            ...formData, //spread operator here to maintain previous data
            [event.target.name]: event.target.value  //update state with value change
        });
    }

    return (
        <div className="register">
            { message && <AlertMessage />}
            <form className="register__form" onSubmit={ handleSubmit }>
            <div className="register__form-group">
                <input type="text" className="register__form-input" placeholder="Name" name="name" id="name" required autoComplete="off" value={ formData.name } onChange={ handleChange }/>
                <label htmlFor="name" className="register__form-label">Name</label>
            </div>
            <div className="register__form-group">
                <input type="email" className="register__form-input" placeholder="Email address" name="email" id="email" required autoComplete="off" value={ formData.email } onChange={ handleChange }/>
                <label htmlFor="email" className="register__form-label">Email address</label>
            </div>
            <div className="register__form-group">
                <input type="password" className={`register__form-input ${ formData.password1.length < 6 &&  formData.password1.length > 0 ? 'register__form-input-error' : '' }`} placeholder="Create Password" name="password1" id="password1" required autoComplete="off" value={ formData.password1 } onChange={ handleChange }/>
                <label htmlFor="password1" className="register__form-label">Create Password</label>
            </div>
            <div className="register__form-group">
                <input type="password" className={`register__form-input ${ formData.password2.length < 6 &&  formData.password2.length > 0 ? 'register__form-input-error' : '' }`} placeholder="Confirm Password" name="password2" id="password2" required autoComplete="off" value={ formData.password2 } onChange={ handleChange }/>
                <label htmlFor="password2" className="register__form-label">Confirm Password</label>
            </div>
            <div className="register__form-group register__button-group">
                <button type="submit" className="landing__btn btn--green">Register</button>
                <GoogleAuth />
            </div>
            <div className="register__login-text">Already have an account? Login <Link className="register__login-link" to="/login">here</Link></div>
            </form>
        </div>
    )
}

export default Register
