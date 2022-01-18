import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "../features/userSlice";
import { setMsg, selectMessage } from '../features/messageSlice';
import { useHistory } from 'react-router-dom';
import './SoberDate.css';

const SoberDate = () => {
    const [soberDate, setSoberDate] = useState(false);
    const [formData, setFormData] = useState({ soberDate: '' });
    const [editSoberDate, setEditSoberDate] = useState(false);

    //Bring in user info from store
    const user = useSelector(selectUser);
    const history = useHistory();
    console.log(user.id)

    //Bring in message state from store
    const message = useSelector(selectMessage);
    const dispatch = useDispatch();

    //if no user is logged in, redirect them back to login page
    if(user.id === undefined) {
        dispatch(setMsg({ msg: 'Please login to view this page',  err: true}));
        history.push('/login');
    }

    //Run use Effect when component mounts
    useEffect(() => {
        fetch(`/api/soberdate/${user.id}`)
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error getting soberdate endpoint`)
            }
           return res.json()
        }).then(data => {
            //Set soberdate state to whatever the latest soberdate to be enetered was. No need to show user older ones and mkae them feel remorse
            setSoberDate(new Date(data.soberDate[data.soberDate.length - 1].date).toUTCString().substr(0, 16));
        }).catch(err => {
            //this is where I will display message to user
            console.log(err)
        })
    }, []);

    const handleSubmit = event => {
        event.preventDefault(); //Prevent submissions of form from refreshing page
        fetch(`/api/soberdate`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, formData })
        }).then(res => {
            if(!res.ok) {
                throw new Error('Error getting endpoint');
            }
            return res.json();
        }).then(data => {
            console.log(data)
            setSoberDate(new Date(data.soberDate.date).toUTCString().substr(0, 16));
            setEditSoberDate(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = event => {
        setFormData({ soberDate: event.target.value })
        console.log(formData);
    }

    const handleEditClick = () => {
        setEditSoberDate(true);
    }

    let dateDifference = new Date().getTime() - new Date(soberDate).getTime();
    let days = Math.floor(dateDifference/(1000 * 3600 * 24));
    let hours = ((dateDifference / 3600000).toFixed(0)).toString();
    let years = days/365;

        return (
            <div className="soberDate">
                <h1 className="soberDate__welcome-message">Welcome { user.name }!</h1>
                { !soberDate || editSoberDate ? (
                    <div className="soberDate__enter-date">
                    <h3 className="soberDate__enter-date-text">Enter your Sobriety Date here:</h3>
                    <form className="soberDate__form-control" onSubmit={ handleSubmit }>
                    <input className="soberDate__sober-input" type="date" name="soberDate" id="soberDate" onChange={ handleChange }/>
                    <button className="soberDate__form-submit soberDate-btn btn--green landing__btn btn--green">Save</button>
                    </form>
                    </div>
                ) : (
                    <div className="soberDate__soberStats-container">
                    <div className="soberDate__soberStats--soberDate">
                        Great Job! You've been sober since { `${soberDate?.substr(0, 3)} ${soberDate?.substr(8, 3)} ${soberDate?.substr(5, 2)}, ${soberDate?.substr(12, 4)}` }
                    </div>
                    <div className="soberDate__soberStats--sober-years">
                        Years: { years.toFixed(2) }
                    </div>
                    <div className="soberDate__soberStats--sober-months">
                        Months: {(years * 12).toFixed(2) }
                    </div>
                    <div className="soberDate__soberStats--sober-days">
                        Days: { days }
                    </div>
                    <div className="soberDate__soberStats--sober-hours">
                        Hours: { hours }
                    </div>
                    <button className="soberDate__edit-btn soberDate-btn btn--green landing__btn" onClick={ handleEditClick }>Edit</button>
                </div>
                )}
            </div>
        )
}

export default SoberDate
