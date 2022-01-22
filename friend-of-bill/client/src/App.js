import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./App.css";

//Component imports
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
import OnAwakening from "./components/OnAwakening";


function App() {
  //Bring in user state from store
  const user = useSelector(selectUser);

  return (
    <Router>
      {/* Only show nav bar when user is logged in */}
      { user.id !== undefined  && <Navbar /> }
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
      <Route exact path="/reviews/new">
        <NightlyReviewForm />
      </Route>
      <Route exact path="/review/:id">
        <NightlyReviewDetail />
      </Route>
      <Route exact path="/awakening">
        <OnAwakening />
      </Route>
    </Router>
  );
}

export default App;
