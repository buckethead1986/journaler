import React from "react";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import JournalTabs from "./JournalTabs";
import JournalTextArea from "../newJournalContainer/JournalTextArea";
import Typography from "@material-ui/core/Typography";
import HelpPageText from "../tutorial/HelpPageText";
import LoginText from "../tutorial/LoginText";
import { returnParsedDate } from "../helperFilesContainer/Helper";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit
  }),
  typography: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  }
});

class TabCreator extends React.Component {
  //If a user is logged in and:
  //1) the helpPage button was clicked, renders the helpPage text.
  //2) 'journal' is a key in this.props.tabContainer, render all journals from this day
  //3) 'journal' is not a key, renders nothing
  //if a user is not logged in, renders the login/welcome text
  renderJournalPaperArea = classes => {
    let dateMessage;
    if (this.props.currentUser) {
      if (this.props.isHelpPage) {
        dateMessage = "Journaler Help";
        return this.returnHelpPage(classes, dateMessage);
      } else {
        if (
          "journal" in this.props.tabContainer[this.props.shownJournalValue]
        ) {
          dateMessage = `Journals written on ${this.props.tabContainer[
            this.props.shownJournalValue
          ].date}`;

          return this.returnJournalTabs(classes, dateMessage);
        } else {
          dateMessage = `No Journals written on ${this.props.tabContainer[
            this.props.shownJournalValue
          ].date}`;
          return this.returnBlankJournalTabsArea(classes, dateMessage);
        }
      }
    } else {
      return <LoginText />;
    }
  };

  returnHelpPage = (classes, dateMessage) => {
    return (
      <Grid item xs={6} className={classes.typography}>
        <Typography
          variant="headline"
          component="h3"
          style={{
            textAlign: "center",
            color: this.props.colors.headline
          }}
        >
          {dateMessage}
        </Typography>
        <HelpPageText
          store={this.props.store}
          colors={this.props.colors}
          changeColorSettings={this.props.changeColorSettings}
        />
      </Grid>
    );
  };

  returnJournalTabs = (classes, dateMessage) => {
    return (
      <Grid item xs={5} className={classes.typography}>
        <Typography
          variant="headline"
          component="h3"
          style={{
            textAlign: "center",
            color: this.props.colors.headline
          }}
        >
          {dateMessage}
        </Typography>
        <JournalTabs
          date={this.props.date}
          store={this.props.store}
          colors={this.props.colors}
          currentUser={this.props.currentUser}
          journals={this.props.journals}
          tabContainer={this.props.tabContainer}
          shownJournalValue={this.props.shownJournalValue}
          deleteJournal={this.props.deleteJournal}
          journalEditOrStatsLink={this.props.journalEditOrStatsLink}
        />
      </Grid>
    );
  };

  returnBlankJournalTabsArea = (classes, dateMessage) => {
    return (
      <Grid item xs={5} className={classes.typography}>
        <Typography
          variant="headline"
          component="h3"
          style={{
            textAlign: "center",
            color: this.props.colors.headline
          }}
        >
          {dateMessage}
        </Typography>
      </Grid>
    );
  };

  //toggles message based on path ending. normal, journal edit, or journal stats.
  renderMessage = () => {
    let message = "Write a new journal";
    let urlPath = window.location.href.split("/")[
      window.location.href.split("/").length - 1
    ];
    if (this.props.currentUser) {
      let date = returnParsedDate(this.props.journals, this.props.journalId);
      if (this.props.isHelpPage) {
        message = "New Journal";
      } else {
        if (urlPath === "stats") {
          message = `Journal Stats ${date}`;
        } else if (urlPath === "edit") {
          message = `Edit Journal ${date}`;
        }
      }
    }
    return (
      <Typography
        variant="headline"
        component="h3"
        style={{
          textAlign: "center",
          color: this.props.colors.headline
        }}
      >
        {message}
      </Typography>
    );
  };

  //renders the journaling area.  Slightly smaller if noone is loged in, to account for explanation text from 'renderHelpPage'
  //alters content based on route path, between new journal, journal stats, and journal edit.
  renderJournalTextArea = classes => {
    let size = 7;
    if (this.props.isHelpPage) {
      size = 6;
    }
    return (
      <Grid item xs={size} className={classes.typography}>
        {this.renderMessage()}
        <Route
          exact
          path="/journaler"
          render={() => {
            return (
              <JournalTextArea
                store={this.props.store}
                openLoginDrawer={this.props.openLoginDrawer}
                setTextAreaAndCallAFunction={
                  this.props.setTextAreaAndCallAFunction
                }
                textTitle={this.props.textTitle}
                textArea={this.props.textArea}
                colors={this.props.colors}
              />
            );
          }}
        />
        <Route
          exact
          path="/journaler/help"
          render={() => {
            return (
              <JournalTextArea
                store={this.props.store}
                currentUser={this.props.currentUser}
                fetchJournals={this.props.fetchJournals}
                openLoginDrawer={this.props.openLoginDrawer}
                setTextAreaAndCallAFunction={
                  this.props.setTextAreaAndCallAFunction
                }
                textTitle={this.props.textTitle}
                textArea={this.props.textArea}
                colors={this.props.colors}
              />
            );
          }}
        />
        <Route
          exact
          path="/journaler/:id/new"
          render={() => {
            return (
              <JournalTextArea
                store={this.props.store}
                currentUser={this.props.currentUser}
                fetchJournals={this.props.fetchJournals}
                openLoginDrawer={this.props.openLoginDrawer}
                setTextAreaAndCallAFunction={
                  this.props.setTextAreaAndCallAFunction
                }
                textTitle={this.props.textTitle}
                textArea={this.props.textArea}
                colors={this.props.colors}
              />
            );
          }}
        />
        <Route
          exact
          path="/journaler/:id/:id/edit"
          render={() => {
            return (
              <JournalTextArea
                store={this.props.store}
                currentUser={this.props.currentUser}
                fetchJournals={this.props.fetchJournals}
                shownJournalValue={this.props.shownJournalValue}
                openLoginDrawer={this.props.openLoginDrawer}
                setTextAreaAndCallAFunction={
                  this.props.setTextAreaAndCallAFunction
                }
                journalId={this.props.journalId}
                textTitle={this.props.textTitle}
                textArea={this.props.textArea}
                colors={this.props.colors}
                edit={true}
              />
            );
          }}
        />
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container wrap="nowrap" spacing={0}>
        {this.renderJournalPaperArea(classes)}
        {this.renderJournalTextArea(classes)}
      </Grid>
    );
  }
}

export default withStyles(styles)(TabCreator);
