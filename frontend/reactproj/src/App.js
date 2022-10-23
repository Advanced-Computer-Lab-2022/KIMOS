import React, { Component } from "react";
import TmpRoutes from "./components/tmpRoutes";
import Navbar from "./components/navbar";
import Guest from "./components/guest";
import Admin from "./components/admin";
import Instructor from "./components/instructor";
import Trainee from "./components/trainee";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  exampleFunction = () => {
    alert("Seweeyyy");
  };
  render() {
    return (
      <Router>
        <div className="main-content">
          <Navbar />

          <Routes>
            <Route exact path="/" element={<TmpRoutes />}></Route>
            <Route exact path="/guest" element={<Guest />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/instructor" element={<Instructor />}></Route>
            <Route exact path="/trainee" element={<Trainee />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
