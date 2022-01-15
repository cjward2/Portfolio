import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "../features/userSlice";
import { setInventory, clearInventory, selectInventory } from '../features/inventorySlice'
import { useHistory, Link } from "react-router-dom";
import "./Inventory.css";

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
    fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error making fetch`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(setInventory(data.inventory.reverse()));
      })
      .catch((err) => {
        //this is where I will display message to user
        console.log("Error block", err);
      });
  }, []);

  console.log(inventory)

  return (
    <div className="inventory">
      <InventoryForm />
      {inventory.map((el, index) => (
        <div key={index} className="inventory__card">
          <div className="inventory__who">Who: {el.who}</div>
          <div className="inventory__why">Why: {el.why}</div>
          <div className="inventory__why">My Part: {el.myPart}</div>
          <Link to={`/inventory/${el._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
