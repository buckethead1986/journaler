import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AppBar from "./components/containers/appbarContainer/AppBar";
import LoginDrawer from "./components/containers/login/LoginDrawer";
import TabCreator from "./components/containers/journalTabsContainer/TabCreator";
import { renderTabsHelper } from "./components/containers/helperFilesContainer/RenderTabsHelper";
import { checkColorCodes } from "./components/containers/helperFilesContainer/Helper";

class App extends Component {
  state = {
    currentUser: [],
    users: [],
    journals: [],
    tabs: [],
    tabContainer: [],
    shownJournalValue: 0,
    loginDrawerOpen: false,
    fromHomePage: false,
    textTitle: "",
    textArea: "",
    journalId: "",
    colors: {},
    isHelpPage: false
  };

  //redirects to '/journaler' unless localstorage token is authorized.
  componentDidMount() {
    fetch(`${this.props.store.getState().url}/current_user`, {
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
      })
      .then(() =>
        this.props.store.dispatch({ type: "SET_DATE", payload: new Date() })
      );
    this.setState({ colors: this.props.store.getState().defaultSettings });
  }

  //checks colors and updates User API with color settings, then rerenders tabs
  changeColorSettings = (e, colorsObject) => {
    e.preventDefault();
    let checkedColors = checkColorCodes(colorsObject, this.state.colors);

    this.postSettingsToAPI(checkedColors);
    this.setState(
      {
        colors: checkedColors
      },
      () => {
        renderTabsHelper(
          this.state.journals,
          this.props.store.getState().date,
          this.setTabAndTabContainerState,
          this.state.colors
        );
      }
    );
  };

  journalEditOrStatsLink = (id, type) => {
    let journal = this.state.journals.filter(journal => journal.id === id)[0];
    this.setTextAreaAndCallAFunction(
      journal.title,
      journal.content,
      id,
      this.props.history.push(
        `/journaler/${this.state.currentUser.id}/${id}/${type}`
      )
    );
  };

  newJournalLink = () => {
    this.setState({ isHelpPage: false }, () => {
      this.setTextAreaAndCallAFunction(
        "",
        "",
        "",
        this.props.history.push(`/journaler/${this.state.currentUser.id}/new`)
      );
    });
  };

  helpPageLink = () => {
    this.setState({ isHelpPage: true }, () => {
      this.setTextAreaAndCallAFunction(
        this.state.textTitle,
        this.state.textArea,
        "",
        this.props.history.push(`/journaler/help`)
      );
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
        isHelpPage: false,
        colors: this.props.store.getState().defaultSettings
      },
      () => {
        this.props.store.dispatch({ type: "RESET_COLORS" });
        localStorage.removeItem("token");
        this.props.history.push("/journaler");
      }
    );
  };

  //maintains and updates the journal textArea state when navigating links/loggin in, etc.
  setTextAreaAndCallAFunction = (
    textTitle,
    textArea,
    journalId,
    callbackFunction
  ) => {
    this.setState(
      {
        textTitle,
        textArea,
        journalId
      },
      () => callbackFunction
    );
  };

  //posts settings object to API.
  postSettingsToAPI = colorsObject => {
    fetch(
      `${this.props.store.getState().url}/users/${this.state.currentUser.id}`,
      {
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
      }
    );
  };

  changeShownJournalValue = value => {
    this.setState({ shownJournalValue: value, isHelpPage: false });
  };

  setTabAndTabContainerState = (tabs, tabContainer, shownJournalValue) => {
    this.setState({ tabs, tabContainer, shownJournalValue });
  };

  fetchUsersAndCurrentUser = () => {
    fetch(`${this.props.store.getState().url}/users`)
      .then(res => res.json())
      .then(json =>
        this.setState({ users: json }, () =>
          fetch(`${this.props.store.getState().url}/current_user`, {
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
                () => {
                  renderTabsHelper(
                    this.state.journals,
                    this.props.store.getState().date,
                    this.setTabAndTabContainerState,
                    this.state.colors
                  );
                }
              );
            })
            .then(() =>
              this.props.history.push(
                `/journaler/${this.state.currentUser.id}/new`
              )
            )
        )
      );
  };

  fetchJournals = (shownJournalValue = 29) => {
    fetch(
      `${this.props.store.getState().url}/users/${this.state.currentUser.id}`
    )
      .then(res => res.json())
      .then(json => {
        this.setJournalStateAndRenderTabs(json.journals);
      })
      .then(() => {
        this.setTextAreaAndCallAFunction("", "", "", {});
        this.changeShownJournalValue(shownJournalValue);
      })
      .then(() => this.newJournalLink());
  };

  deleteJournal = (id, shownJournalValue) => {
    fetch(`${this.props.store.getState().url}/journals/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setJournalStateAndRenderTabs(
          json.filter(journal => {
            return journal.user_id === this.state.currentUser.id;
          })
        )
      )
      .then(() => this.newJournalLink())
      .then(() => this.changeShownJournalValue(shownJournalValue));
  };

  setJournalStateAndRenderTabs = json => {
    this.setState(
      {
        journals: this.sortJournals(json)
      },
      () => {
        renderTabsHelper(
          this.state.journals,
          this.props.store.getState().date,
          this.setTabAndTabContainerState,
          this.state.colors
        );
      }
    );
  };

  //simple sort function to make sure journals are sorted in chronological order. Rails API was sometimes misordering items.
  sortJournals = journals => {
    return journals.sort((a, b) => {
      return a.created_at > b.created_at
        ? 1
        : b.created_at > a.created_at ? -1 : 0;
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

  render() {
    return (
      <div
        style={{
          backgroundColor: this.state.colors.background,
          height: "100vh"
        }}
      >
        <AppBar
          store={this.props.store}
          currentUser={this.state.currentUser}
          logoutLink={this.logoutLink}
          openLoginDrawer={this.openLoginDrawer}
          tabs={this.state.tabs}
          shownJournalValue={this.state.shownJournalValue}
          changeShownJournalValue={this.changeShownJournalValue}
          loginOrLogoutButton={this.loginOrLogoutButton}
          colors={this.state.colors}
          newJournalLink={this.newJournalLink}
          helpPageLink={this.helpPageLink}
        />
        <LoginDrawer
          store={this.props.store}
          loginDrawerOpen={this.state.loginDrawerOpen}
          openLoginDrawer={this.openLoginDrawer}
          fetchUsersAndCurrentUser={this.fetchUsersAndCurrentUser}
          fromHomePage={this.state.fromHomePage}
        />

        <Route
          exact
          path="/journaler"
          render={() => {
            return (
              <TabCreator
                store={this.props.store}
                loginDrawerOpen={this.state.loginDrawerOpen}
                openLoginDrawer={this.openLoginDrawer}
                setTextAreaAndCallAFunction={this.setTextAreaAndCallAFunction}
                textTitle={this.state.textTitle}
                textArea={this.state.textArea}
                colors={this.state.colors}
              />
            );
          }}
        />

        {this.state.currentUser.length !== 0 &&
        this.state.tabContainer.length !== 0 ? (
          <Route
            path="/journaler/:id"
            render={() => {
              return (
                <TabCreator
                  isHelpPage={this.state.isHelpPage}
                  store={this.props.store}
                  currentUser={this.state.currentUser}
                  journals={this.state.journals}
                  fetchJournals={this.fetchJournals}
                  tabContainer={this.state.tabContainer}
                  shownJournalValue={this.state.shownJournalValue}
                  changeColorSettings={this.changeColorSettings}
                  setTextAreaAndCallAFunction={this.setTextAreaAndCallAFunction}
                  textTitle={this.state.textTitle}
                  textArea={this.state.textArea}
                  colors={this.state.colors}
                  deleteJournal={this.deleteJournal}
                  journalEditOrStatsLink={this.journalEditOrStatsLink}
                  journalId={this.state.journalId}
                  newJournalLink={this.newJournalLink}
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
