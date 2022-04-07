import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./App.css";

//Component imports
import Landing from "./components/pages/Landing";
import Navbar from './components/Navbar';
import NotFound from "./components/pages/NotFound";

//Lazy loading for route based code splitting
const Login = React.lazy(() => import('./components/pages/Login'));
const Register = React.lazy(() => import('./components/pages/Register'));
const Dashboard = React.lazy(() => import('./components/pages/Dashboard'));
const Inventory = React.lazy(() => import('./components/pages/Inventory'));
const NightlyReview = React.lazy(() => import('./components/pages/NightlyReview'));
const InventoryDetail = React.lazy(() => import('./components/pages/InventoryDetail'));
const NightlyReviewForm = React.lazy(() => import('./components/pages/NightlyReviewForm'));
const NightlyReviewDetail = React.lazy(() => import('./components/pages/NightlyReviewDetail'));
const OnAwakening = React.lazy(() => import('./components/pages/OnAwakening'));
const Chatroom = React.lazy(() => import('./components/pages/Chatroom'));

function App() {
  //Bring in user state from store
  const user = useSelector(selectUser);

  return (
    <Router>
      {/* Only show nav bar when user is logged in */}
      { user.id !== undefined  && <Navbar /> }
      <Suspense fallback={<div class="lds-ring"><div></div><div></div><div></div><div></div></div>}>
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
      </Suspense>
    </Router>
  );
}

export default App;
