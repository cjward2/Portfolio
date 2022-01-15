import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "../features/userSlice";
import { setMsg, selectMessage } from '../features/messageSlice';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const dailyReflectionInitialState = {
        title: "",
        pageNumber: "",
        paragraph1: "",
        paragraph2: ""
    }

    const [soberDate, setSoberDate] = useState(false);
    const [formData, setFormData] = useState({ soberDate: '' });
    const [dailyReflection, setDailyReflection] = useState(dailyReflectionInitialState);
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

        fetch('/api/dailyReflection')
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error getting endpoint`)
            }
            return res.json();
        }).then(data => {
            setDailyReflection({ 
                title: data.dailyReflectionTitle,
                pageNumber: data.dailyReflectionPageNumber,
                paragraph1: data.dailyReflectionP1,
                paragraph2: data.dailyReflectionP2
             });
        }).catch(err => {
            console.log(err);
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
            <div className="dashboard">
                <h1 className="dashboard__welcome-message">Welcome { user.name }!</h1>
                { !soberDate || editSoberDate ? (
                    <>
                    <h3 className="dashboard__enter-date-text">Enter your Sobriety Date here:</h3>
                    <form className="dashboard__form-control" onSubmit={ handleSubmit }>
                    <input className="dashboard__sober-input" type="date" name="soberDate" id="soberDate" onChange={ handleChange }/>
                    <button className="dashboard__form-submit btn">Submit</button>
                    </form>
                    </>
                ) : (
                    <div className="dashboard__soberStats-container">
                    <div className="soberStats__soberDate">
                        Great Job! You've been sober since { `${soberDate?.substr(0, 3)} ${soberDate?.substr(8, 3)} ${soberDate?.substr(5, 2)}, ${soberDate?.substr(12, 4)}` }
                    </div>
                    <div className="soberStats__sober-years">
                        Years: { years.toFixed(2) }
                    </div>
                    <div className="soberStats__sober-months">
                        Months: {(years * 12).toFixed(2) }
                    </div>
                    <div className="soberStats__sober-days">
                        Days: { days }
                    </div>
                    <div className="soberStats__sober-hours">
                        Hours: { hours }
                    </div>
                    <button className="dashboard__edit-btn btn" onClick={ handleEditClick }>Edit</button>
                </div>
                )}

                <div className="dashboard__daily-reflection-container">
                    {/* I only want to display a daily reviews if they are actually coming back from backend. Im too reliant on a third paty website to potentially not send anything and break the app if this check isnt present */}
                    { dailyReflection.paragraph1 && (
                        <>
                        <h1>{ dailyReflection.title }</h1>
                        {/* There is parts of the text from paragraph1 that I dont want like the disclaimer */}
                        <h4>{ dailyReflection.paragraph1.substr(0, dailyReflection.paragraph1.length - 390) }</h4>
                        <h3>{ dailyReflection.pageNumber }</h3>
                        <h2>{ dailyReflection.paragraph2 }</h2>
                        </>
                    ) }
                    
                </div>
                
            </div>
        )
}

export default Dashboard
