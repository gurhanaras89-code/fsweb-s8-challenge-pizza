import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import './App.css';
import Home from './Home';
import OrderForm from './OrderForm';
import Success from './Success';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/pizza" component={OrderForm} />
        <Route path="/success" component={Success} />
      </Switch>
    </div>
  );
}

export default App;