import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks'
import Home from "./Home"

function App() {
   setDefaultBreakpoints([
      { xs: 0 },
      { s: 500},
      { m: 550 },
      { l: 800 },
      { xl: 1025 }
   ]);
  return (

    <BreakpointProvider>
      <Home />
    </BreakpointProvider>
  );
}

export default App;
