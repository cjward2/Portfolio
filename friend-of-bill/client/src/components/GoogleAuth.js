import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { login } from "../features/userSlice";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './GoogleAuth.css';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const responseGoogle = (response) => {
        // console.log(response);
        if(response.error) {  //If user closes popup, dont send request to backend
            return;
        }
        fetch('/api/google/auth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response.profileObj)
        }).then(res => {
            if(!res.ok) {
                throw new Error('Error getting enpoint')
            }
            return res.json();
        }).then(data => {
            console.log(data);
            window.sessionStorage.userID = data._id;
            window.sessionStorage.name = data.name;
            dispatch(login({ id: data._id, name: data.name }));
            history.push('/dashboard');

        }).catch(err => {
            console.log(err);
        })
      }

    return (
        <div>
            <GoogleLogin
            className="google-btn"
            clientId="554136500823-tgqakj8m5elvcl71k0ko3s0qtnc6pokt.apps.googleusercontent.com"
            buttonText="LOGIN"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}/>
        </div>
    )
}

export default GoogleAuth;