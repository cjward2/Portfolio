import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Link } from 'react-router-dom';
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
        setReviews(data.review.reverse());  //I want the most recent review to be first for the user. Easiest way to do that for me way to just reverse the array being sent from my backend
      })
      .catch((err) => {
        //this is where I will display message to user
        console.log("Error block", err);
      });
  }, []);

 const handleDelete = id => {
   fetch(`/api/reviews/${id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(user)
   }).then(res => {
     if(!res.ok) {
       throw new Error(`Error getting delete endpoint`)
     }
     return res.json();
   }).then(data => {
    setReviews(data.reviews.reverse());
   }).catch(err => {
     console.log(err);
   })
 }

  return (
    <div className="nightlyReview">
      <h1>Nightly Reviews</h1>
      <Link className="nightly-review-link inventory__show-form-btn landing__btn btn--green" to="/reviews/new">New Review</Link>
      <div className="nightlyReview__container">
      { reviews.map(el => (
            <div className="nightlyReview__card" key={ el._id }>
              { new Date(el.date).toLocaleDateString() }
              <Link className="inventory__detail-link" to={`/review/${el._id}`}>View Details</Link>
              <button className="inventory__delete-btn landing__btn btn--green" onClick={() => handleDelete(el._id) }>Delete</button>
            </div>
        ))}
        </div>
    </div>
  );
};


export default NightlyReview;
