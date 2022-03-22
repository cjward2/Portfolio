import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { selectMessage, setMsg } from '../../features/messageSlice';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeRequest } from "../../util";

import AlertMessage from "../AlertMessage";
import DeleteConfirmation from "../DeleteConfirmation";
import "./NightlyReview.css";

const NightlyReview = () => {
    const [reviews, setReviews] = useState([]);
    const [reviewId, setReviewId] = useState(null);
    const [showModal, setShowModal] = useState(false);

  //Bring in user info from store
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const history = useHistory();

  //if no user is logged in, redirect them back to login page
  if (user.id === undefined) {
    dispatch(setMsg({ msg: "Please login to view this page", err: true }));
    history.push("/login");
  }

  useEffect(() => {
    const getRequest = async () => {
      try {
        const data = await makeRequest(`/api/reviews/${user.id}`);
        //I want the most recent review to be first for the user. Easiest way to do that for me way to just reverse the array being sent from my backend
        setReviews(data.review.reverse());
      } catch(error) {
        //this is where I will display message to user
        dispatch(setMsg({ msg: `Something went wrong while grabbing your nightly reviews. Please Try again later.`, err: true }))
      }
    }
    getRequest();
  }, []);

 const handleDelete = async id => {
     try {
      const data = await makeRequest(`/api/reviews/${id}`, 'DELETE', { body: JSON.stringify(user) });
      setReviews(data.reviews.reverse());
      dispatch(setMsg({ msg: 'Nightly Review sucessfully deleted!', err: false }));
     } catch(error) {
      dispatch(setMsg({ msg: `Something went wrong when trying to delete this item. Please try again later!`, err: true }));
     }
   setShowModal(false);
 }

 const showHideDeleteModal = id => {
  setReviewId(id);
  setShowModal(!showModal);
 }

  return (
    <div className="nightlyReview">
      { message && <AlertMessage marginTop/> }
      { showModal && <DeleteConfirmation modalVisible={ showModal } showHideDeleteModal={showHideDeleteModal} id={reviewId} handleDelete={handleDelete} /> }
      <Link className="nightly-review-link custom-btn btn--green" to="/reviews/new">New Review</Link>
      <div className="nightlyReview__container">
      { reviews.map(el => (
            <div className="nightlyReview__card" key={ el._id }>
              { new Date(el.date).toLocaleDateString() }
              <Link className="inventory__detail-link" to={`/review/${el._id}`}>View Details</Link>
              <button className="btn--red custom-btn" onClick={() => showHideDeleteModal(el._id) }>Delete</button>
            </div>
        ))}
        </div>
    </div>
  );
};


export default NightlyReview;
