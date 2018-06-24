import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AppBar from "./components/containers/AppBar";
import LoginDrawer from "./components/containers/login/LoginDrawer";
import JournalArea from "./components/containers/journal/JournalArea";
import JournalTabs from "./components/containers/journalTabs/JournalTabs";
import JournalTextArea from "./components/containers/journal/JournalTextArea";
import ReactDOM from "react-dom";

const url = "http://localhost:3001/api/v1";

class App extends Component {
  constructor() {
    super();
  }
  state = {
    loginDrawerOpen: false,
    currentUser: [],
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.fetchUsersAndCurrentUser();
    } else {
      this.props.history.push("/journaler");
    }
  }

  fetchUsersAndCurrentUser = () => {
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json =>
        this.setState({ users: json }, () =>
          fetch(`${url}/current_user`, {
            headers: {
              "content-type": "application/json",
              accept: "application/json",
              Authorization: localStorage.getItem("token")
            }
          })
            .then(res => res.json())
            .then(json => {
              this.setState(
                {
                  currentUser: this.state.users.filter(user => {
                    return user.id === json.id;
                  })[0]
                },
                // () => console.log(this.state)
                () => this.props.history.push(`/journaler`)
              );
            })
        )
      );
  };

  // fetchUsers = () => {
  //   fetch(`${url}/users`)
  //     .then(res => res.json())
  //     .then(json => this.setState({ users: json }));
  // };

  logoutLink = () => {
    this.setState(
      {
        loginDrawerOpen: false,
        currentUser: [],
        users: []
      },
      () => {
        localStorage.clear();
        this.props.history.push("/journaler");
      }
    );
  };

  openLoginDrawer = () => {
    this.setState(prevState => {
      return { loginDrawerOpen: !prevState.loginDrawerOpen };
    });
  };

  // componentDidMount() {
  //   this.focusDiv();
  // }
  // componentDidUpdate() {
  //   console.log("here");
  //   if (this.state.active) this.focusDiv();
  // }
  // focusDiv() {
  //   ReactDOM.findDOMNode(this.refs.dropdown).focus();
  // }

  // focusDiv = () => {
  //   console.log(
  //     ReactDOM.findDOMNode(this.foo)
  //       .getElementsByTagName("div")[2]
  //       .getElementsByTagName("div")[0]
  //       .getElementsByTagName("textarea")[0]
  //   );
  //   ReactDOM.findDOMNode(this.foo)
  //     .getElementsByTagName("div")[2]
  //     .getElementsByTagName("div")[0]
  //     .getElementsByTagName("textarea")[0];

  // ReactDOM.findDOMNode(this.a).focus();
  // };

  // setRef(elem) {
  //   console.log(elem);
  // }

  // fetchCurrentUser = () => {
  //   fetch(`${url}/current_user`, {
  //     headers: {
  //       "content-type": "application/json",
  //       accept: "application/json",
  //       Authorization: localStorage.getItem("token")
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(json => console.log(json));
  // };

  render() {
    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <AppBar
          url={url}
          currentUser={this.state.currentUser}
          logoutLink={this.logoutLink}
          openLoginDrawer={this.openLoginDrawer}
          loginOrLogoutButton={this.loginOrLogoutButton}
        />
        <LoginDrawer
          url={url}
          store={this.props.store}
          loginDrawerOpen={this.state.loginDrawerOpen}
          openLoginDrawer={this.openLoginDrawer}
          fetchUsersAndCurrentUser={this.fetchUsersAndCurrentUser}
          // fetchCurrentUser={this.fetchCurrentUser}
        />
        <Route
          exact
          path="/journaler"
          render={() => {
            return (
              <JournalTextArea
                url={url}
                // ref={foo => (this.foo = foo)}
                store={this.props.store}
                // openLoginDrawer={this.openLoginDrawer}
              />
            );
          }}
        />
        {this.state.currentUser.id !== undefined ? (
          <Route
            exact
            path="/journaler/new"
            render={() => {
              return (
                <div>
                  <JournalTextArea url={url} store={this.props.store} />
                </div>
              );
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(App);
