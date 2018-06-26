import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AppBar from "./components/containers/AppBar";
import LoginDrawer from "./components/containers/login/LoginDrawer";
import JournalArea from "./components/containers/journal/JournalArea";
import JournalTabs from "./components/containers/journalTabs/JournalTabs";
import JournalTextArea from "./components/containers/journal/JournalTextArea";
import ReactDOM from "react-dom";
import TabCreator from "./components/containers/journalTabs/TabCreator";

const url = "http://localhost:3001/api/v1";

class App extends Component {
  constructor() {
    super();
  }
  state = {
    loginDrawerOpen: false,
    currentUser: [],
    users: [],
    journals: []
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.fetchUsersAndCurrentUser();
    } else {
      this.props.history.push("/journaler");
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProp.currentUser.journals.length !== this.props.currentUser.journals.length) {
  //
  //   }
  // }

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
                  currentUser: json,
                  journals: this.state.users.filter(user => {
                    return user.id === json.id;
                  })[0].journals
                },
                () => console.log(this.state.currentUser, this.state.journals),
                this.props.history.push(`/journaler/${json.id}`)
              );
            })
        )
      );
  };

  fetchJournals = () => {
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json => console.log(json));
  };

  // fetchUsers = () => {
  //   fetch(`${url}/users`)
  //     .then(res => res.json())
  //     .then(json => this.setState({ users: json }));
  // };

  // testFunction = (tabs, tabContainers) => {
  //   console.log(tabs, tabContainers);
  // };

  logoutLink = () => {
    this.setState(
      {
        loginDrawerOpen: false,
        currentUser: [],
        users: []
      },
      () => {
        localStorage.removeItem("token");
        this.props.history.push("/journaler");
      }
    );
  };

  openLoginDrawer = () => {
    this.setState(prevState => {
      return { loginDrawerOpen: !prevState.loginDrawerOpen };
    });
  };

  //not tabs in appbar, scrollable button list, change state of parent component which renders different papers based on value
  render() {
    let date = new Date(); //move to state, allows rerender of tabs based on date (date.setDate(newdate)

    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <AppBar
          url={url}
          store={this.props.store}
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
        />

        {this.state.currentUser.length !== 0 ? (
          <Route
            exact
            path="/journaler/:id"
            render={() => {
              return (
                <TabCreator
                  url={url}
                  date={date}
                  store={this.props.store}
                  currentUser={this.state.currentUser}
                  journals={this.state.journals}
                  fetchUsersAndCurrentUser={this.fetchUsersAndCurrentUser}
                />
              );
            }}
          />
        ) : (
          ""
        )}
        <Route
          exact
          path="/journaler"
          render={() => {
            return <JournalTextArea url={url} store={this.props.store} />;
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

// {this.state.currentUser.length !== 0 ? (
//   <JournalTabs
//     url={url}
//     date={date}
//     store={this.props.store}
//     currentUser={this.state.currentUser}
//     journals={this.state.journals}
//   />
// ) : (
//   ""
// )}
