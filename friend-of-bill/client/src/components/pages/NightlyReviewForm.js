import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setMsg } from '../../features/messageSlice';
import { selectUser } from "../../features/userSlice";
import requireAuth from "../requireAuth";
import { makeRequest } from "../../util";
import './NightlyReviewForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const NightlyReviewForm = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

    const initialFormState = {
        describe1: "",
        describe2: "",
        describe3: "",
        describe4: "",
        describe5: "",
        describe6: "",
        describe7: "",
        describe8: "",
        describe9: "",
        describe10: ""
    }

    const initialCheckboxState = [
      {
        question: 1,
        checked: false
      },
      {
        question: 2,
        checked: false
      },
      {
        question: 3,
        checked: false
      },
      {
        question: 4,
        checked: false
      },
      {
        question: 5,
        checked: false
      },
      {
        question: 6,
        checked: false
      },
      {
        question: 7,
        checked: false
      },
      {
        question: 9,
        checked: false
      },
      {
        question: 10,
        checked: false
      },
    ];
 
    const [formData, setFormData] = useState(initialFormState);
    const [checkbox, setCheckbox] = useState(initialCheckboxState)

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const checkboxChange = position => {
      const checked = checkbox.map((item, index) => {
        return index === position ? { question: item.question, checked: !item.checked } : { question: item.question, checked: item.checked }
      });
      setCheckbox(checked);
    }

    const handleSubmit = async event => {
      event.preventDefault();
      try {
        const data = await makeRequest('/api/reviews/new', 'POST', { body: JSON.stringify({ formData, checkbox, user }) });
        history.push(`/review/${data.review._id}`);
      } catch(error) {
        dispatch(setMsg({ msg: 'Something went wrong when saving your review. Please try again later.', err: true }));
        //If something goes wrong set the message in the store and display on redirect for user
        history.push('/reviews');
      }
    }

  return (
    <div>
      <form className="nightlyReview__form" onSubmit={ handleSubmit }>
        <div className="nightlyReview__form-group">
          <div className="nightlyReview__form-title">
            1. When we retire at night, we constructively review our day. Were we resentful?
          </div>
          
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q1" id="q1" onChange={ () => checkboxChange(0) }/>
          <label className="label" htmlFor="q1">
           <span className="inner" />
            <span className="switch" />
          </label>
      </div>
      <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe1" name="describe1" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe1">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">2. Were we selfish?</div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q2" id="q2" onChange={ () => checkboxChange(1) }/>
          <label className="label" htmlFor="q2">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe2" name="describe2" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe2">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">3. Were we dishonest?</div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q3" id="q3" onChange={ () => checkboxChange(2) }/>
          <label className="label" htmlFor="q3">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe3" name="describe3" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe3">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">4. Were we afraid?</div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q4" id="q4" onChange={ () => checkboxChange(3) }/>
          <label className="label" htmlFor="q4">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe4" name="describe4" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe2">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">
            5. Do we owe an apology?
          </div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q5" id="q5" onChange={ () => checkboxChange(4) }/>
          <label className="label" htmlFor="q5">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe5" name="describe5" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe5">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">
            6. Have we kept something to ourselves which should be discussed
            with another person at once?
          </div>
          
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q6" id="q6" onChange={ () => checkboxChange(5) }/>
          <label className="label" htmlFor="q6">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe6" name="describe6" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe6">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">
            7. Were we kind and loving toward all?
          </div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q7" id="q7" onChange={ () => checkboxChange(6) }/>
          <label className="label" htmlFor="q7">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe7" name="describe7" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe7">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">
            8. What could we have done better?
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe8" name="describe8" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe8">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">
            9. Were we thinking of ourselves most of the time?
          </div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q9" id="q9" onChange={ () => checkboxChange(7) }/>
          <label className="label" htmlFor="q9">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe9" name="describe9" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe9">Describe if needed</label>
          </div>
          <div className="nightlyReview__form-title">
            10. Or were we thinking of what we could do for others, of what we
            could pack into the stream of life?
          </div>
          <div className="toggle-switch">
          <input type="checkbox" className="checkbox" 
               name="q10" id="q10" onChange={ () => checkboxChange(8) }/>
          <label className="label" htmlFor="q10">
           <span className="inner" />
            <span className="switch" />
          </label>
          </div>
          <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="describe10" name="describe10" style={{'height':'125px'}} onChange={ handleChange }></textarea>
          <label htmlFor="describe10">Describe if needed</label>
          </div>
        </div>
        <button className="nightlyReview-btn inventory__show-form-btn custom-btn btn--green" type="submit">Save</button>
      </form>
    </div>
  );
};

export default requireAuth(NightlyReviewForm);
