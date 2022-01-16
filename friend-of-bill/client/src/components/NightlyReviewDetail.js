import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NightlyReviewDetail = () => {
    const params = useParams();
    console.log(params);

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
       }).catch(err => {
           console.log(err)
       })
    }, []);

    return (
        <div className='nightlyReviewDetail'>
            Nightly Review Detail
        </div>
    )
}

export default NightlyReviewDetail
