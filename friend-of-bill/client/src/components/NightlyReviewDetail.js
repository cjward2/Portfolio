import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NightlyReviewDetail = () => {
    const params = useParams();  //I want the id from the route to pass into my endpoint

    const [review, setReview] = useState({});

    useEffect(() => {
       fetch(`/api/review/${params.id}`)
       .then(res => {
           if(!res.ok) {
               throw new Error('Error getting reviews enpoint');
           }
           return res.json()
       }).then(data => {
           setReview(data.review);
           console.log(data.review);
       }).catch(err => {
           console.log(err)
       })
    }, []);

    return (
        <div className='nightlyReviewDetail'>
            <p>You've completed your nightly review!</p>
            <p>Be careful not to drift into worry, remorse or morbid reflection, for that would diminish our usefulness to others.</p>
            <p>After making our review we ask God's forgiveness and inquire what corrective measures should be taken.</p>
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
            <Link to="/reviews">Nightly Reviews</Link>
        </div>
    )
}

export default NightlyReviewDetail
