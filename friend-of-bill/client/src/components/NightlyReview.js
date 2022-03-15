import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { selectMessage, setMsg } from '../features/messageSlice';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import AlertMessage from "./AlertMessage";
import "./NightlyReview.css";

const NightlyReview = () => {
    const [reviews, setReviews] = useState([]);

  //Bring in user info from store
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const history = useHistory();

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
        //I want the most recent review to be first for the user. Easiest way to do that for me way to just reverse the array being sent from my backend
        setReviews(data.review.reverse());
      })
      .catch((err) => {
        //this is where I will display message to user
        console.log("Error block", err);
      });
  }, []);

 const handleDelete = id => {
  const confirm = window.confirm('Are you sure you want to delete this item?');
  if(confirm) {
   fetch(`/api/reviews/${id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(user)
   }).then(res => {
     if(!res.ok) {
       throw new Error(`Something went wrong when trying to delete this item. Please try again later!`)
     }
     return res.json();
   }).then(data => {
    setReviews(data.reviews.reverse());
    dispatch(setMsg({ msg: 'Nightly Review sucessfully deleted!', err: false }));
   }).catch(err => {
    dispatch(setMsg({ msg: err.message, err: true }))
   })
  }
 }

  return (
    <div className="nightlyReview">
      { message && <AlertMessage marginTop/> }
      <Link className="nightly-review-link custom-btn btn--green" to="/reviews/new">New Review</Link>
      <div className="nightlyReview__container">
      { reviews.map(el => (
            <div className="nightlyReview__card" key={ el._id }>
              { new Date(el.date).toLocaleDateString() }
              <Link className="inventory__detail-link" to={`/review/${el._id}`}>View Details</Link>
              <button className="inventory__delete-btn custom-btn" onClick={() => handleDelete(el._id) }>Delete</button>
            </div>
        ))}
        </div>
    </div>
  );
};


export default NightlyReview;
