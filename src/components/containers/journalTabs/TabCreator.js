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
  render() {
    console.log(this.props);
    const dateMessage = `Journals written on ${this.props.tabContainer[
      this.props.shownJournalValue
    ].date}`;
    const { classes } = this.props;
    return (
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item xs={5} className={classes.typography}>
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
            fetchJournals={this.props.fetchJournals}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TabCreator);
