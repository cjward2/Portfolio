import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Switch>
        <Route exact path="/">
        <Home />
      </Route>
      <Route path="/detail/:id">
      <Detail />
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
