import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AppBar from "./components/containers/AppBar";
import LoginDrawer from "./components/containers/login/LoginDrawer";
import JournalArea from "./components/containers/journal/JournalArea";
import JournalTextArea from "./components/containers/journal/JournalTextArea";

const url = "http://localhost:3001/api/v1";

class App extends Component {
  constructor() {
    super();
  }
  state = {
    loginDrawerOpen: false
  };

  openLoginDrawer = () => {
    this.setState(prevState => {
      return { loginDrawerOpen: !prevState.loginDrawerOpen };
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <AppBar />
        <LoginDrawer
          url={url}
          loginDrawerOpen={this.state.loginDrawerOpen}
          openLoginDrawer={this.openLoginDrawer}
        />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <JournalTextArea
                url={url}
                openLoginDrawer={this.openLoginDrawer}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
