import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setInventory, selectInventory } from '../features/inventorySlice'
import { selectMessage, setMsg } from '../features/messageSlice';
import { useHistory, Link } from "react-router-dom";
import "./Inventory.css";
//Bring in components
import InventoryForm from "./InventoryForm";
import AlertMessage from "./AlertMessage";
import DeleteConfirmation from "./DeleteConfirmation";

const Inventory = () => {
  const [inventoryId, setInventoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Bring in user info from store
  const user = useSelector(selectUser);
  const inventory = useSelector(selectInventory);
  const history = useHistory();
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  //if no user is logged in, redirect them back to login page
  if (user.id === undefined) {
    history.push("/login");
  }

  useEffect(() => {
    fetch(`/api/inventories/${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Something went wrong when grabbing your inventory. Please try again later.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(setInventory(data.inventory.reverse())); //Set inventory state in store in reverse order so most recent inventory will be at top for user
      })
      .catch(err => {
        //this is where I will display message to user
        dispatch(setMsg({ msg: err.message, err: true }))
      });
  }, []);

  const handleDelete = id => {
    //const confirm = window.confirm('Are you sure you want to delete this item?');
    fetch(`/api/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => {
      if(!res.ok) {
        throw new Error(`Error deleting inventory. Please try again later.`)
      }
      return res.json();
    }).then(data => {
      //Set inventory state in store in reverse order so most recent inventory will be at top for user
      dispatch(setInventory(data.inventory.reverse()));
      //Show sucess message to user
      dispatch(setMsg({ msg: 'Inventory sucessfully deleted!', err: false }));
    }).catch(err => {
      //Show user error message
      dispatch(setMsg({ msg: err.message, err: true }))
    })
    setShowModal(false);
  
  }

  const showHideDeleteModal = (id) => {
    setInventoryId(id);
    setShowModal(!showModal);
  }

  return (
    <div className="inventory">
      { message && <AlertMessage marginTop/> }
      { showModal && <DeleteConfirmation modalVisible={ showModal } showHideDeleteModal={showHideDeleteModal} id={inventoryId} handleDelete={handleDelete} /> }
      <InventoryForm />
      <div className="inventory__card-container">
      {inventory.map(el => (
        <div key={el._id} className="inventory__card">
          <div className="inventory__who">Who: {el.who}</div>
          <div className="inventory__why">Why: {el.why}</div>
          <div className="inventory__why">My Part: {el.myPart}</div>
          <div className="inventory__btn-group">
          <Link className="inventory__detail-link" to={`/inventory/${el._id}`}>View Details</Link>
          <button onClick={ () => showHideDeleteModal(el._id) } className="btn--red inventory__delete-btn custom-btn">Delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Inventory;
