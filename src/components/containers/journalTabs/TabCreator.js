import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import JournalTabs from "./JournalTabs";
import JournalTextArea from "../journal/JournalTextArea";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { renderHelpPage } from "../tutorial/TutorialText";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit
  }),
  typography: {
    marginTop: theme.spacing.unit * 3
  }
});

class TabCreator extends React.Component {
  renderJournalsOrBlank = () => {
    let dateMessage;
    if (this.props.currentUser) {
      //checks if the user has written journals on this date, if so, renders them as individual JournalPaper, through JournalTabs
      if ("journal" in this.props.tabContainer[this.props.shownJournalValue]) {
        dateMessage = `Journals written on ${this.props.tabContainer[
          this.props.shownJournalValue
        ].date}`;
        return (
          <Grid item xs={5} className={this.props.classes.typography}>
            <Typography
              variant="headline"
              component="h3"
              style={{ textAlign: "center" }}
            >
              {dateMessage}
            </Typography>
            <JournalTabs
              url={this.props.url}
              date={this.props.date}
              store={this.props.store}
              currentUser={this.props.currentUser}
              journals={this.props.journals}
              tabContainer={this.props.tabContainer}
              shownJournalValue={this.props.shownJournalValue}
            />
          </Grid>
        );
        //if no journals written, renders nothing
      } else {
        dateMessage = `No Journals written on ${this.props.tabContainer[
          this.props.shownJournalValue
        ].date}`;
        return (
          <Grid item xs={5} className={this.props.classes.typography}>
            <Typography
              variant="headline"
              component="h3"
              style={{ textAlign: "center" }}
            >
              {dateMessage}
            </Typography>
          </Grid>
        );
      }
      //if no user is logged in, renders the welcome/explanation text
      //this was a ton of text, so I exported it to a helper function
    } else {
      {
        return renderHelpPage(this.props);
      }
    }
  };

  //renders the journaling area.  Slightly smaller if noone is loged in, to account for explanation text from 'renderHelpPage'
  renderJournalTextArea = () => {
    let size = 7;
    if (!this.props.currentUser) {
      size = 6;
    }
    return (
      <Grid item xs={size} className={this.props.classes.typography}>
        <Typography
          variant="headline"
          component="h3"
          style={{ textAlign: "center" }}
        >
          Write a new journal
        </Typography>
        <JournalTextArea
          url={this.props.url}
          store={this.props.store}
          currentUser={this.props.currentUser}
          fetchJournals={this.props.fetchJournals}
          openLoginDrawer={this.props.openLoginDrawer}
          pullJournalContent={this.props.pullJournalContent}
          textTitle={this.props.textTitle}
          textArea={this.props.textArea}
          colors={this.props.colors}
        />
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container wrap="nowrap" spacing={0}>
        {this.renderJournalsOrBlank()}
        {this.renderJournalTextArea()}
      </Grid>
    );
  }
}

export default withStyles(styles)(TabCreator);
