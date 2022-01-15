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
    const [dailyReflection, setDailyReflection] = useState(dailyReflectionInitialState);

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
        fetch('/api/soberdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error making fetch`);
            }
            return res.json();
        }).then(data => {
            console.log(data);
            console.log(data.soberDate[0]);
            console.log(new Date(data.soberDate[0].date).toUTCString());
            setSoberDate(new Date(data.soberDate[0].date).toUTCString().substr(0, 16));
            setDailyReflection({ 
                title: data.dailyReflectionTitle,
                pageNumber: data.dailyReflectionPageNumber,
                paragraph1: data.dailyReflectionP1,
                paragraph2: data.dailyReflectionP2
             });
        }).catch(err => {
            //this is where I will display message to user
            console.log('Error block' , err); 
        });
    }, []);

    let dateDifference = new Date().getTime() - new Date(soberDate).getTime();
    let days = Math.floor(dateDifference/(1000 * 3600 * 24));
    let hours = ((dateDifference / 3600000).toFixed(0)).toString();
    let years = days/365;

        return (
            <div className="dashboard">
                <h1 className="dashboard__welcome-message">Welcome { user.name }!</h1>
                { !soberDate ? (
                    <>
                    <h3 className="dashboard__enter-date-text">Enter your Sobriety Date here:</h3>
                    <form className="dashboard__form-control">
                    <input className="dashboard__sober-input" type="date" name="soberDate" id="soberDate" />
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
                </div>
                )}

                <div className="dashboard__daily-reflection-container">
                    <h1>{ dailyReflection.title }</h1>
                    <h4>{ dailyReflection.paragraph1.substr(0, dailyReflection.paragraph1.length - 390) }</h4>
                    <h3>{ dailyReflection.pageNumber }</h3>
                    <h2>{ dailyReflection.paragraph2.substr(0, dailyReflection.paragraph2.length - 390) }</h2>
                </div>
                
            </div>
        )
}

export default Dashboard
