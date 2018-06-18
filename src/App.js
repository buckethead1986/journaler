import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import AppBar from "./components/containers/AppBar";
import JournalArea from "./components/containers/journal/JournalArea";

const url = "https://localhost:3001/api/v1";

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Route
          exact
          path="/"
          render={() => {
            return <JournalArea />;
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
