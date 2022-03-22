import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setMsg, selectMessage } from "../features/messageSlice";
import { useHistory } from "react-router-dom";
import { makeRequest } from "../../src/util";

import AlertMessage from "./AlertMessage";
import "./SoberDate.css";

const SoberDate = () => {
  const [soberDate, setSoberDate] = useState(false);
  const [formData, setFormData] = useState({ soberDate: "" });
  const [editSoberDate, setEditSoberDate] = useState(false);

  //Bring in user info from store
  const user = useSelector(selectUser);
  const history = useHistory();
  const message = useSelector(selectMessage);

  const dispatch = useDispatch();
  //Run use Effect when component mounts

  //Run this outside useEffect for slow internet speeds. for fast internet, useEffect fires with the request before redirect, which shows wrong message to user
  if (user.id === undefined) { 
    dispatch(setMsg({ msg: "Please login to view this page", err: true }));
    history.push("/login");
}

  useEffect(() => {
    const getRequest = async () => {
      try {
        const data = await makeRequest(`/api/soberdate/${user.id}`);
        setSoberDate(
          new Date(data.soberDate[data.soberDate.length - 1].date)
            .toUTCString()
            .substr(0, 16)
        );
      } catch (error) {
        if (user.id === undefined) {
          dispatch(setMsg({ msg: "Please login to view this page", err: true }));
          history.push("/login");
        } else {
          dispatch(setMsg({
            msg: "Something went wrong!!!. Please try again later.",
            err: true,
          })
        );
        }
      }
    };
    getRequest();
  }, []);

  if (user.id === undefined) {
    dispatch(setMsg({ msg: "Please login to view this page", err: true }));
    history.push("/login");
  }

  const handleSubmit = async event => {
    //Prevent submissions of form from refreshing page
    event.preventDefault();
      try {
        const data = await makeRequest("/api/soberdate", "POST", {
          body: JSON.stringify({ user, formData }),
        });
        //Create new date in a string so i can use substr to take what i want from it
        setSoberDate(new Date(data.soberDate.date).toUTCString().substr(0, 16));
        setEditSoberDate(false);
      } catch (error) {
        dispatch(setMsg({ msg: 'Something went wrong. Please try again later.', err: true }))
      }
  };

  const handleChange = (event) => {
    setFormData({ soberDate: event.target.value });
  };

  const handleEditClick = () => {
    setEditSoberDate(true);
  };

  //First get difference b/w two dates. will be returned in ms
  let dateDifference = new Date().getTime() - new Date(soberDate).getTime();
  //Calculate number of days. Using math.floor to round it down. I didnt want a decimal here
  let days = Math.floor(dateDifference / (1000 * 3600 * 24));
  //calculate hours and use toFixed to limit decimal point to two.
  let hours = (dateDifference / 3600000).toFixed(0);
  //Use days calculated baove to get years
  let years = days / 365;

  const addCommaToString = (string) => {
    //Using regex to automatically add comma to values for sober date stats
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="soberDate">
      {message && <AlertMessage marginTop />}
      <h1 className="soberDate__welcome-message">Welcome {user.name}!</h1>
      {!soberDate || editSoberDate ? (
        <div className="soberDate__enter-date">
          <h3 className="soberDate__enter-date-text">
            Enter your Sobriety Date here:
          </h3>
          <form className="soberDate__form-control" onSubmit={handleSubmit}>
            <input
              className="soberDate__sober-input"
              type="date"
              name="soberDate"
              id="soberDate"
              onChange={handleChange}
            />
            <button className="soberDate__form-submit soberDate-btn btn--green custom-btn">
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="soberDate__soberStats">
          <div className="soberDate__soberStats--soberDate">
            Your sobriety date:{" "}
            <strong>{`${soberDate?.substr(0, 3)} ${soberDate?.substr(
              8,
              3
            )} ${soberDate?.substr(5, 2)}, ${soberDate?.substr(
              12,
              4
            )}`}</strong>
          </div>
          <div className="soberDate__soberStats--time">
            Great Job! You've been sober for:
            <div className="soberDate__soberStats--sober-years">
              <strong>{addCommaToString(years.toFixed(2))}</strong> Years
            </div>
            <div className="soberDate__soberStats--sober-months">
              <strong>{addCommaToString((years * 12).toFixed(2))}</strong>{" "}
              Months
            </div>
            <div className="soberDate__soberStats--sober-days">
              <strong>{addCommaToString(days)}</strong> Days
            </div>
            <div className="soberDate__soberStats--sober-hours">
              <strong>{addCommaToString(hours)}</strong> Hours
            </div>
          </div>
          <button
            className="soberDate__edit-btn soberDate-btn btn--green custom-btn"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default SoberDate;
