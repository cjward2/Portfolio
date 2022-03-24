import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { login } from "../features/userSlice";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMsg } from '../features/messageSlice';

import './GoogleAuth.css';
import { makeRequest } from '../util';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const responseGoogle = async response => {
        //If user closes popup, dont send request to backend
        if(response.error) {  
            return;
        }
        try {
            const data = await makeRequest('/api/google/auth', 'POST', { body: JSON.stringify(response.profileObj) });
            window.sessionStorage.userID = data._id;
            window.sessionStorage.name = data.name;
            window.sessionStorage.img = data.googleImg;
            dispatch(login({ id: data._id, name: data.name, profilePic: data.googleImg  }));
            history.push('/dashboard');
        } catch(error) {
            dispatch(setMsg({ msg: 'Something went wrong when try to login. Please try again later.', err: true }));
        }
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