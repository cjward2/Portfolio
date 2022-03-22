import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { selectMessage, setMsg } from '../../features/messageSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
import { makeRequest } from '../../util';

import './NightlyReviewDetail.css';
import AlertMessage from "../AlertMessage";

const NightlyReviewDetail = () => {
    const [review, setReview] = useState({});

    const user = useSelector(selectUser);
    const params = useParams();  //I want the id from the route to pass into my endpoint
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useSelector(selectMessage);

    if (user.id === undefined) { 
        dispatch(setMsg({ msg: "Please login to view this page", err: true }));
        history.push("/login");
    }

    useEffect(() => {
        const getRequest = async () => {
            try {
                const data = await makeRequest(`/api/review/${params.id}`);
                setReview(data.review);
            } catch(error) {
                if (user.id === undefined) { 
                    dispatch(setMsg({ msg: "Please login to view this page", err: true }));
                    history.push("/login");
                } else {
                    dispatch(setMsg({ msg: 'Something went wrong. Please try again later.', err: true }));
                }
            }
        }
        getRequest();
    }, []);

    return (
        <div className='nightlyReviewDetail'>
            <Link className='nightly-review-link' to="/reviews">Back to Nightly Reviews</Link>
            { message && <AlertMessage marginTop/> }
            <p>You've completed your nightly review!</p>
            <p>Be careful not to drift into worry, remorse or morbid reflection, for that would diminish our usefulness to others.</p>
            <p>After making our review we ask God's forgiveness and inquire what corrective measures should be taken.</p>
            <div className="nightlyReviewQuestions__container">
            <div className="nightlyReviewDetail__question">
                1. When we retire at night, we constructively review our day. Were we resentful?
            </div>
            <div className="nightlyReview__answer">
                { review.q1 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe1 === '' ? 'None' : review.describe1 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
                2. Were we selfish?
            </div>
            <div className="nightlyReview__answer">
                { review.q2 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe2 === '' ? 'None' : review.describe2 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            3. Were we dishonest?
            </div>
            <div className="nightlyReview__answer">
                { review.q3 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe3 === '' ? 'None' : review.describe3 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            4. Were we afraid?
            </div>
            <div className="nightlyReview__answer">
                { review.q4 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe4 === '' ? 'None' : review.describe4 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            5. Do we owe an apology?
            </div>
            <div className="nightlyReview__answer">
                { review.q5 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe5 === '' ? 'None' : review.describe5 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            6. Have we kept something to ourselves which should be discussed with another person at once?
            </div>
            <div className="nightlyReview__answer">
                { review.q6 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe6 === '' ? 'None' : review.describe6 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            7. Were we kind and loving toward all?
            </div>
            <div className="nightlyReview__answer">
                { review.q7 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe7 === '' ? 'None' : review.describe7 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            8. What could we have done better?
            </div>
            <div className="nightlyReview__answer">
                <div className="nightlyReview__description">
                   Description: { review.describe8 === '' ? 'None' : review.describe8 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            9. Were we thinking of ourselves most of the time?
            </div>
            <div className="nightlyReview__answer">
                { review.q9 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe9 === '' ? 'None' : review.describe9 }
                </div>
            </div>
            <div className="nightlyReviewDetail__question">
            10. Or were we thinking of what we could do for others, of what we could pack into the stream of life?
            </div>
            <div className="nightlyReview__answer">
                { review.q10 === 'true' ? 'Yes' : 'No'}
                <div className="nightlyReview__description">
                   Description: { review.describe10 === '' ? 'None' : review.describe10 }
                </div>
            </div>
            </div>
        </div>
    )
}

export default NightlyReviewDetail
