import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "../features/userSlice";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "./NightlyReview.css";
import NightlyReviewForm from "./NightlyReviewForm";

const NightlyReview = () => {
    const [reviews, setReviews] = useState([]);
    const [addNewReview, setAddNewReview] = useState(false);

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
        setReviews(data.review.reverse());
      })
      .catch((err) => {
        //this is where I will display message to user
        console.log("Error block", err);
      });
  }, []);

  console.log(reviews);

  return (
    <div className="nightlyReview">
      <h1>Nightly Reviews</h1>
      <Link className="new-review-link" to="/reviews/new">New Review</Link>
      { reviews.map(el => (
            <div className="nightlyReview__card" key={ el._id }>
              { new Date(el.date).toLocaleDateString() }
              <Link to={`/reviews/${el._id}`}>View Details</Link>
            </div>
        ))}
    </div>
  );
};


export default NightlyReview;
