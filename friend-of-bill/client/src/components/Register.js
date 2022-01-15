import React from 'react'
import { useState } from 'react';
import './Register.css';

const Register = () => {
    const initialState = {
        name: "",
        email: "",
        password1: "",
        password2: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = event => {
        console.log('submit');
        //prevent default action of form
        event.preventDefault();

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
            console.log(data)
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
        <div className="register">
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
                <input type="password" className="register__form-input" placeholder="Create Password" name="password1" id="password1" required autoComplete="off" value={ formData.password1 } onChange={ handleChange }/>
                <label htmlFor="password1" className="register__form-label">Create Password</label>
            </div>
            <div className="register__form-group">
                <input type="password" className="register__form-input" placeholder="Confirm Password" name="password2" id="password2" required autoComplete="off" value={ formData.password2 } onChange={ handleChange }/>
                <label htmlFor="password2" className="register__form-label">Confirm Password</label>
            </div>
            <div className="register__form-group">
                <button type="submit" className="btn btn--green">Login</button>
            </div>
            </form>
        </div>
    )
}

export default Register