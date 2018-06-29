import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";

export function renderHelpPage(props) {
  let dateMessage = "Welcome to Journaler";
  return (
    <Grid item xs={6} className={props.classes.typography}>
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
          Journaler is a platform for daily journaling. It's not a blog (yet),
          because it's meant for you to write, for YOU.
        </Typography>
        <Typography variant="subheading">
          Blogs are a way for you to write TO other people, which always struck
          me as a bit pompous. Journaler is an area to get your thoughts down,
          for you. There's no way for other users to see your journals, so don't
          worry if what you write today is a bit weird!
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
      <Paper className={props.classes.root} elevation={4}>
        <Typography variant="headline">
          How? Just start writing to the right
        </Typography>
        <Typography variant="subheading" />
        <Typography variant="subheading">
          If you want to save a journal (don't worry, any current progress will
          be saved) or change the color scheme, login in the upper right. Then:
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              The last 30 days will be shown at the top of the page. Click on a
              day to see everything you wrote that day, and metrics for those
              journals
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Select 'Settings' in the upper right to change colors/format.
              Proper colors (rgb, hex, 'purple', etc) will immediately change
              the sample icon. 'Submit' to save settings.
            </Typography>
          </li>
        </ul>
      </Paper>
    </Grid>
  );
}
