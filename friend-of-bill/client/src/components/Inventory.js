import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setInventory, selectInventory } from '../features/inventorySlice'
import { useHistory, Link } from "react-router-dom";
import "./Inventory.css";
//Bring in components
import InventoryForm from "./InventoryForm";

const Inventory = () => {
  //Bring in user info from store
  const user = useSelector(selectUser);
  const inventory = useSelector(selectInventory);
  const history = useHistory();
  const dispatch = useDispatch();

  //if no user is logged in, redirect them back to login page
  if (user.id === undefined) {
    history.push("/login");
  }

  useEffect(() => {
    fetch(`/api/inventories/${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error making fetch`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(setInventory(data.inventory.reverse())); //Set inventory state in store in reverse order so most recent inventory will be at top for user
      })
      .catch((err) => {
        //this is where I will display message to user
        console.log("Error block", err);
      });
  }, []);

  const handleDelete = async id => {
    const confirm = window.confirm('Are you sure you want to delete this item?');
    if(confirm) {
    fetch(`/api/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => {
      if(!res.ok) {
        throw new Error(`Error getting delete inventory endpoint`)
      }
      return res.json();
    }).then(data => {
      dispatch(setInventory(data.inventory.reverse())); //Set inventory state in store in reverse order so most recent inventory will be at top for user
    }).catch(err => {
      console.log(err)
    })
  }
  }

  return (
    <div className="inventory">
      <InventoryForm />
      <div className="inventory__card-container">
      {inventory.map(el => (
        <div key={el._id} className="inventory__card">
          <div className="inventory__who">Who: {el.who}</div>
          <div className="inventory__why">Why: {el.why}</div>
          <div className="inventory__why">My Part: {el.myPart}</div>
          <div className="inventory__btn-group">
          <Link className="inventory__detail-link" to={`/inventory/${el._id}`}>View Details</Link>
          <button onClick={ () => handleDelete(el._id) } className="inventory__delete-btn custom-btn">Delete</button>
          </div>
        </div>
      ))}
      </div>
      
    </div>
  );
};

export default Inventory;
