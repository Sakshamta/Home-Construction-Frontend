import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './components/Home';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddHouse from './components/AddHouse';
import EditHouse from './components/EditHouse';



function App() {
  return (
    <div>
     <Router>
        <Switch>
            <Route path= "/" exact component={Home}/>
            <Route path= "/home" exact component={Home}/>
            <Route path= "/add" exact component={AddHouse}/>
            <Route path= "/edit" exact component={EditHouse}/>
            <Route component ={NotFound}/>
        </Switch>
     </Router>

    </div>
  );
}

export default App;
