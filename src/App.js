import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Profile from "./components/containers/Profile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Profile />
      </div>
    );
  }
}

export default App;
