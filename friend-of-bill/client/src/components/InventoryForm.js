import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setInventory, selectInventory } from "../features/inventorySlice";
import { useHistory } from "react-router-dom";

import "./InventoryForm.css";

const InventoryForm = ({ who, why, fear, selfEsteem, security, personalRelationship, sexRelations, pride, myPart, id, editForm }) => {
  //Bring in user info from store
  const user = useSelector(selectUser);
  const inventory = useSelector(selectInventory);
  const dispatch = useDispatch();
  const history = useHistory();

  let formInitialState; //Initialize in global env so i can conditonally assign initial state
  if (who) {
    //If props are coming in, then user is trying to edit the form, so i want the state and hence the value opf each input to be whatever is passed down
    formInitialState = {
      who,
      why,
      myPart,
    };
  } else {
    //Otherwise user is entering inventory for first time, so initialize state to empty strings
    formInitialState = {
      who: "",
      why: "",
      myPart: "",
    };
  }
  let checkboxInitialState; //Initialize in global env so i can conditonally assign initial state
  if (who) {
    checkboxInitialState = [
      {
        type: "Fear",
        checked: fear !== 'false',
      },
      {
        type: "Self-Esteem",
        checked: selfEsteem !== 'false',
      },
      {
        type: "Security",
        checked: security !== 'false',
      },
      {
        type: "Personal Relationship",
        checked: personalRelationship !== 'false',
      },
      {
        type: "Sex Relations",
        checked: sexRelations !== 'false',
      },
      {
        type: "Pride",
        checked: pride !== 'false',
      },
    ];
  } else {
    checkboxInitialState = [
      {
        type: "Fear",
        checked: false,
      },
      {
        type: "Self-Esteem",
        checked: false,
      },
      {
        type: "Security",
        checked: false,
      },
      {
        type: "Personal Relationship",
        checked: false,
      },
      {
        type: "Sex Relations",
        checked: false,
      },
      {
        type: "Pride",
        checked: false,
      },
    ];
  }
    

  const [formData, setFormData] = useState(formInitialState);
  const [isChecked, setIsChecked] = useState(checkboxInitialState);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(who) {  //If this is true, I know it was passed down from inventory detail screen which means the user wants to edit the form. IN WHICH CASE i want to trigger my put route
      fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formData, isChecked, user })
      }).then(res => {
        if(!res.ok) {
          throw new Error(`Error getting endpoint`);
        }
        history.push('/inventory'); //If update was successful, send the user back to the inventory page
      }).catch(err => {
        console.log(err);
      })

    } else {  //otherwise do my post route
      fetch("/api/inventory/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, isChecked, user }),
      }).then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          dispatch(setInventory([data, ...inventory]));
          setFormData(formInitialState);
          setIsChecked(checkboxInitialState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setShowForm(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const checkboxChange = (position) => {
    const checked = isChecked.map((item, index) => {  //cycle through isChecked array and if the postiton that is passed in equals the index, set the item.checked value to the opposite -- true to false vice cersa
      return index === position
        ? { type: item.type, checked: !item.checked }
        : { type: item.type, checked: item.checked };  //Otherwise set it to whatever it currently is -- do nothing
    });
    setIsChecked(checked); //Then set the state to checked
  };

  return (
    <div>
      {/* consitionally display button to user. If they already clicked add new, i dont want them to still see it */}
      { !showForm &&  <button className="inventory__show-form-btn custom-btn btn--green" onClick={ () => setShowForm(!showForm) }>Add New</button>}
      
      { showForm || editForm ? (
        <div className="inventory__form--container">
          <form className="inventory__form" onSubmit={handleSubmit}>
          <div className="inventory__form-group">
            <input
              type="text"
              className="inventory__form-input"
              placeholder="Who or what are you resentful towards"
              name="who"
              id="who"
              required
              autoComplete="off"
              onChange={handleChange}
              value={formData.who}
            />
            <label htmlFor="who" className="inventory__form-label">
              Who or what are you resentful towards
            </label>
          </div>
          <div className="inventory__form-group">
            <input
              type="text"
              className="inventory__form-input"
              placeholder="Why are you resentful"
              name="why"
              id="why"
              required
              autoComplete="off"
              onChange={handleChange}
              value={formData.why}
            />
            <label htmlFor="why" className="inventory__form-label">
              Why are you resentful
            </label>
          </div>
          <div className="inventory__affects-my">Affects my:</div>
          <div className="inventory__form-group">
            <input
              type="checkbox"
              className="inventory__form-input-checkbox"
              name="fear"
              id="fear"
              autoComplete="off"
              onChange={() => checkboxChange(0)}
              isChecked={ isChecked[0].checked }
            />
            <label htmlFor="fear" className="inventory__form-label-checkbox">
              Fear
            </label>
          </div>
          <div className="inventory__form-group">
            <input
              type="checkbox"
              className="inventory__form-input-checkbox"
              name="selfEsteem"
              id="selfEsteem"
              autoComplete="off"
              onChange={() => checkboxChange(1)}
              checked={ isChecked[1].checked }
            />
            <label htmlFor="selfEsteem" className="inventory__form-label-checkbox">
              Self-esteem
            </label>
          </div>
          <div className="inventory__form-group">
            <input
              type="checkbox"
              className="inventory__form-input-checkbox"
              name="security"
              id="security"
              autoComplete="off"
              onChange={() => checkboxChange(2)}
              checked={ isChecked[2].checked }
            />
            <label htmlFor="security" className="inventory__form-label-checkbox">
              Security
            </label>
          </div>
          <div className="inventory__form-group">
            <input
              type="checkbox"
              className="inventory__form-input-checkbox"
              name="personalRelationship"
              id="personalRelationship"
              autoComplete="off"
              onChange={() => checkboxChange(3)}
              checked={ isChecked[3].checked }
            />
            <label
              htmlFor="personalRelationship"
              className="inventory__form-label-checkbox"
            >
              Personal Relationship
            </label>
          </div>
          <div className="inventory__form-group">
            <input
              type="checkbox"
              className="inventory__form-input-checkbox"
              name="sexRelations"
              id="sexRelations"
              autoComplete="off"
              onChange={() => checkboxChange(4)}
              checked={ isChecked[4].checked }
            />
            <label htmlFor="sexRelations" className="inventory__form-label-checkbox">
              Sex Relations
            </label>
          </div>
          <div className="inventory__form-group">
            <input
              type="checkbox"
              className="inventory__form-input-checkbox"
              name="pride"
              id="pride"
              autoComplete="off"
              onChange={() => checkboxChange(5)}
              checked={ isChecked[5].checked }
            />
            <label htmlFor="pride" className="inventory__form-label-checkbox">
              Pride
            </label>
          </div>
          <div className="inventory__form-group">
            <div className="form-floating">
            <textarea className="form-control" placeholder="Where have I been selfish, dishonest, or afraid?" id="myPart" name="myPart" style={{'height':'125px'}} onChange={ handleChange }></textarea>
            <label htmlFor="myPart">Where have I been selfish, dishonest, or afraid?</label>
            </div>
          </div>
          <div className="inventory__form-group">
            <button type="submit" className="btn--green custom-btn">
              Save
            </button>
            <button className="red--btn custom-btn" onClick={ () => setShowForm(false) }>Cancel</button>
          </div>
        </form>
        </div>
      ) : ( <div></div> ) }
      
    </div>
  );
};

export default InventoryForm;
