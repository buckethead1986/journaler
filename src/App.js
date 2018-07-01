import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AppBar from "./components/containers/AppBar";
import LoginDrawer from "./components/containers/login/LoginDrawer";
import SettingsDrawer from "./components/containers/settings/SettingsDrawer";
// import JournalArea from "./components/containers/journal/JournalArea";
// import JournalTabs from "./components/containers/journalTabs/JournalTabs";
import JournalTextArea from "./components/containers/journal/JournalTextArea";
import TabCreator from "./components/containers/journalTabs/TabCreator";
import { renderTabsHelper } from "./components/containers/RenderTabsHelper";

const url = "http://localhost:3001/api/v1";

class App extends Component {
  state = {
    currentUser: [],
    users: [],
    journals: [],
    tabs: [],
    tabContainer: [],
    shownJournalValue: 0,
    settingsDrawerOpen: false,
    loginDrawerOpen: false,
    fromHomePage: false,
    textTitle: "",
    textArea: "",
    colors: {}
  };

  //redirects to '/journaler' unless localstorage token is authorized.
  componentDidMount() {
    fetch(`${url}/current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.fetchUsersAndCurrentUser();
        } else {
          this.props.history.push("/journaler");
        }
      });
  }

  changeColorSettings = (e, colorsObject) => {
    //decide if youre going to use store or state to handle this.
    e.preventDefault();
    this.props.store.dispatch({
      type: "SUBMIT_COLOR",
      payload: colorsObject
    });
    this.postSettingsToAPI(colorsObject);
    // console.log(hasJournalColor, noJournalColor, backgroundColor);
    this.setState(
      {
        colors: colorsObject
      },
      () => {
        this.openSettingsDrawer();
        // console.log(this.state.colors);
        renderTabsHelper(
          this.state.journals,
          this.props.store,
          new Date(),
          this.setTabAndTabContainerState,
          this.state.colors
        );
      }
    );
  };

  postSettingsToAPI = colorsObject => {
    fetch(`${url}/users/${this.state.currentUser.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          id: this.state.currentUser.id,
          settings: JSON.stringify(colorsObject)
        }
      })
    });
  };

  changeShownJournalValue = value => {
    this.setState({ shownJournalValue: value });
  };

  setTabAndTabContainerState = (tabs, tabContainer, shownJournalValue) => {
    this.setState({ tabs, tabContainer, shownJournalValue });
  };

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
                  journals: this.sortJournals(
                    this.state.users.filter(user => {
                      return user.id === json.id;
                    })[0].journals
                  ),
                  colors: JSON.parse(
                    this.state.users.find(user => user.id === json.id).settings
                  )
                },
                () =>
                  renderTabsHelper(
                    this.state.journals,
                    this.props.store,
                    new Date(),
                    this.setTabAndTabContainerState,
                    this.state.colors
                  )
              );
            })
            .then(() =>
              this.props.history.push(`/journaler/${this.state.currentUser.id}`)
            )
        )
      );
  };

  fetchJournals = () => {
    fetch(`${url}/users/${this.state.currentUser.id}`)
      .then(res => res.json())
      .then(json => {
        this.setState(
          {
            journals: this.sortJournals(json.journals)
          },
          () => {
            renderTabsHelper(
              this.state.journals,
              this.props.store,
              new Date(),
              this.setTabAndTabContainerState,
              this.state.colors
            );
          }
        );
      });
  };

  //simple sort function to make sure journals are sorted in chronological order. Rails API was sometimes misordering items.
  sortJournals = journals => {
    return journals.sort((a, b) => {
      return a.created_at > b.created_at
        ? 1
        : b.created_at > a.created_at ? -1 : 0;
    });
  };

  //self explanatory. logs out a user, resets or removes state.
  logoutLink = () => {
    this.setState(
      {
        loginDrawerOpen: false,
        currentUser: [],
        users: [],
        textTitle: "",
        textArea: "",
        colors: {
          hasJournalsColor: "#33cc00",
          noJournalsColor: "#33cc00",
          buttonTextColor: "white",
          buttonBackgroundColor: "#3F51B5",
          backgroundColor: "white"
        }
      },
      () => {
        this.props.store.dispatch({ type: "RESET_COLORS" });
        localStorage.removeItem("token");
        this.props.history.push("/journaler");
      }
    );
  };

  //retains content already written in journal area if you log in or sign up.
  pullJournalContent = (textTitle, textArea) => {
    this.setState({
      textTitle,
      textArea
    });
  };

  //toggles the login drawer open and closed.  Begins on signup section if its opened from the 'signup to save journal' button.
  openLoginDrawer = (fromHomePage = false) => {
    this.setState(prevState => {
      return {
        loginDrawerOpen: !prevState.loginDrawerOpen,
        fromHomePage
      };
    });
  };

  //toggles settings drawer open and closed
  openSettingsDrawer = () => {
    this.setState(prevState => {
      return { settingsDrawerOpen: !prevState.settingsDrawerOpen };
    });
  };

  render() {
    let date = new Date(); //move to state, allows rerender of tabs based on date (date.setDate(newdate)

    return (
      <div
        style={{
          backgroundColor: this.state.colors.backgroundColor,
          height: "100vh"
        }}
      >
        <AppBar
          url={url}
          store={this.props.store}
          currentUser={this.state.currentUser}
          logoutLink={this.logoutLink}
          openLoginDrawer={this.openLoginDrawer}
          openSettingsDrawer={this.openSettingsDrawer}
          tabs={this.state.tabs}
          shownJournalValue={this.state.shownJournalValue}
          changeShownJournalValue={this.changeShownJournalValue}
          loginOrLogoutButton={this.loginOrLogoutButton}
          colors={this.state.colors}
        />
        <LoginDrawer
          url={url}
          store={this.props.store}
          loginDrawerOpen={this.state.loginDrawerOpen}
          openLoginDrawer={this.openLoginDrawer}
          fetchUsersAndCurrentUser={this.fetchUsersAndCurrentUser}
          fromHomePage={this.state.fromHomePage}
        />
        <SettingsDrawer
          url={url}
          store={this.props.store}
          settingsDrawerOpen={this.state.settingsDrawerOpen}
          openSettingsDrawer={this.openSettingsDrawer}
          changeColorSettings={this.changeColorSettings}
          colors={this.state.colors}
        />
        <Route
          exact
          path="/journaler"
          render={() => {
            return (
              <TabCreator
                url={url}
                store={this.props.store}
                loginDrawerOpen={this.state.loginDrawerOpen}
                openLoginDrawer={this.openLoginDrawer}
                pullJournalContent={this.pullJournalContent}
                textTitle={this.state.textTitle}
                textArea={this.state.textArea}
              />
            );
          }}
        />
        {this.state.currentUser.length !== 0 &&
        this.state.tabContainer.length !== 0 ? (
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
                  fetchJournals={this.fetchJournals}
                  tabContainer={this.state.tabContainer}
                  shownJournalValue={this.state.shownJournalValue}
                  pullJournalContent={this.pullJournalContent}
                  textTitle={this.state.textTitle}
                  textArea={this.state.textArea}
                />
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
