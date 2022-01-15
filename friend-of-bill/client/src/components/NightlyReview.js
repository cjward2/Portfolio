import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import "./NightlyReview.css";

const NightlyReview = () => {
    const [reviews, setReviews] = useState([]);

  //Bring in user info from store
  const user = useSelector(selectUser);
  const history = useHistory();
  console.log(user.id);

  //if no user is logged in, redirect them back to login page
  if (user.id === undefined) {
    history.push("/login");
  }

  useEffect(() => {
    fetch(`/api/reviews/${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error making fetch`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.review);
        setReviews(data.review);
      })
      .catch((err) => {
        //this is where I will display message to user
        console.log("Error block", err);
      });
  }, []);

  return (
    <div className="nightlyReview">
      <h1>Nightly Review</h1>
    </div>
  );
};

export default NightlyReview;
