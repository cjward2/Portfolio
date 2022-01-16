import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Navbar from './components/Navbar';
import NightlyReview from "./components/NightlyReview";
import InventoryDetail from "./components/InventoryDetail";
import NightlyReviewForm from "./components/NightlyReviewForm";
import NightlyReviewDetail from "./components/NightlyReviewDetail";
import "./App.css";

function App() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <Router>
      {/* Only show nav bar when user is logged in */}
      { user.id !== undefined && <Navbar /> }
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/inventory">
        <Inventory />
      </Route>
      <Route exact path="/inventory/:id">
        <InventoryDetail />
      </Route>
      <Route exact path="/reviews">
        <NightlyReview />
      </Route>
      <Route path="/reviews/:id">
        <NightlyReviewDetail />
      </Route>
      <Route path="/reviews/new">
        <NightlyReviewForm />
      </Route>
      
    </Router>
  );
}

export default App;
