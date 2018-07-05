import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

const LoginText = props => {
  let dateMessage = "Welcome to Journaler";
  return (
    <Grid item xs={5} className={props.classes.typography}>
      <Typography
        variant="headline"
        component="h3"
        style={{ textAlign: "center" }}
      >
        {dateMessage}
      </Typography>
      <Paper className={props.classes.root} elevation={4}>
        <Typography variant="headline">What is Journaler?</Typography>
        <Typography variant="subheading">
          Journaler is a platform for daily journaling. See daily writing
          streaks, search old journals, and identify common themes in your
          writing.
        </Typography>
        <Typography variant="subheading">
          To get started, just start writing to the right. If you'd like to save
          any work, login (upper right) or sign up as a new user (at the
          bottom). Don't worry, anything you've already written will stick
          around.
        </Typography>
      </Paper>
      <Paper className={props.classes.root} elevation={4}>
        <Typography variant="headline">Why?</Typography>
        <Typography variant="subheading">
          Writing is valuable, timeless, and therapeutic. I'm a firm believer in
          the power of writing, and I try to start every day by writing at least
          750 words, and built a platform to make it simple for other people to
          do the same. On Journaler, you can:
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              Quickly write down accomplishments from today
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Jot down lists, keep notes, write novels
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Set a word count goal, and see how often you hit your mark
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Search old journals, by date, title, and content
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              (Soon) See themes in your writing, like how you were focused on
              your job, family, dragons, etc, for a while
            </Typography>
          </li>
        </ul>
      </Paper>
    </Grid>
  );
};

export default withStyles(styles)(LoginText);
