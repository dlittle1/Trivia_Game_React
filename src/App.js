import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./Home"
import Game from './Game'

function App() {
  return (
     <Router>
            <Switch>
               <Route exact path='/'>
                  <Game />
               </Route>
               <Route path='/'>
                  <Game />
               </Route>
            </Switch>
     </Router>
  );
}

export default App;
