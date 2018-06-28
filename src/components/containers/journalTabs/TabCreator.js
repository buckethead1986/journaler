import React from "react";
// import { Grid, Row, Col } from "react-flexbox-grid";
import Grid from "@material-ui/core/Grid";
// import JournalTabs from "./JournalTabs";
import { withStyles } from "@material-ui/core/styles";
import JournalTabs from "./JournalTabs";
import JournalTextArea from "../journal/JournalTextArea";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  typography: {
    // textAlign: "center",
    marginTop: theme.spacing.unit * 3
  }
});

class TabCreator extends React.Component {
  renderJournalsOrBlank = (classes, props) => {
    let dateMessage;
    if ("journal" in props.tabContainer[props.shownJournalValue]) {
      dateMessage = `Journals written on ${props.tabContainer[
        props.shownJournalValue
      ].date}`;
      return (
        <Grid item xs={5} className={classes.typography}>
          <Typography
            variant="headline"
            component="h3"
            style={{ textAlign: "center" }}
          >
            {dateMessage}
          </Typography>
          <JournalTabs
            url={props.url}
            date={props.date}
            store={props.store}
            currentUser={props.currentUser}
            journals={props.journals}
            tabContainer={props.tabContainer}
            shownJournalValue={props.shownJournalValue}
          />
        </Grid>
      );
    } else {
      dateMessage = `No Journals written on ${props.tabContainer[
        props.shownJournalValue
      ].date}`;
      return (
        <Grid item xs={5} className={classes.typography}>
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
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container wrap="nowrap" spacing={0}>
        {this.renderJournalsOrBlank(classes, this.props)}

        <Grid item xs={7} className={classes.typography}>
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
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TabCreator);
