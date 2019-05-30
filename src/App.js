import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";  
import "./App.css";
import Home from "./pages/Home.jsx";


function App() {
  return (


    <Router>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
