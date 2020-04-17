import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./Home"
import Game from './Game'

function App() {
   setDefaultBreakpoints([
      { xs: 0 },
      { s: 500},
      { m: 550 },
      { l: 800 },
      { xl: 1025 }
   ]);
  return (
     <Router>
        <BreakpointProvider>
            <Switch>
               <Route exact path='/Trivia_Game_React'>
                  <Game />
               </Route>
               <Route path='/game'>
                  <Game />
               </Route>
            </Switch>
        </BreakpointProvider>
     </Router>
  );
}

export default App;
