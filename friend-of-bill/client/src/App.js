import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./App.css";

//Component imports
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Inventory from "./components/pages/Inventory";
import Navbar from './components/Navbar';
import NightlyReview from "./components/pages/NightlyReview";
import InventoryDetail from "./components/pages/InventoryDetail";
import NightlyReviewForm from "./components/pages/NightlyReviewForm";
import NightlyReviewDetail from "./components/pages/NightlyReviewDetail";
import OnAwakening from "./components/pages/OnAwakening";
import Chatroom from "./components/pages/Chatroom";
import NotFound from "./components/pages/NotFound";

function App() {
  //Bring in user state from store
  const user = useSelector(selectUser);

  return (
    <Router>
      {/* Only show nav bar when user is logged in */}
      { user.id !== undefined  && <Navbar /> }
      <Switch>
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
        <Route path="/awakening">
          <OnAwakening />
        </Route>
        <Route path="/chatroom">
          <Chatroom />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
