import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ZoomOutMap from "@material-ui/icons/ZoomOutMap";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import Clear from "@material-ui/icons/Clear";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit
  }),
  button: {
    margin: theme.spacing.unit
  }
});

class PaperSheet extends React.Component {
  state = {
    isFullSize: false,
    isFavorite: false
  };

  toggleSize = () => {
    this.setState(prevState => {
      return { isFullSize: !prevState.isFullSize };
    });
  };

  //This reformats the json data, which removes line breaks, back into text that looks like what the user input.
  reformatJsonDataWithLineBreaks = text => {
    text = text.split("\n").map((text, index) => <p key={index}>{text}</p>); //works on weird arrow rails renders
    return text;
  };

  //Truncating the text was simple for long journals:  journal.slice(0, 500).  This truncates based on number of line breaks,
  //so a journal with 50 words, one word per line, wouldnt take up 50 lines.
  //I arbitrarily chose 4 line breaks.  Split the text around line breaks, iterate through 4 times,
  //find the index of a line break, slice the text at that index, and cumulatively add up the indeces to get the index for the 4th line break
  //If you know of a good method that does 'Check if the resulting div is X height or larger. If so, truncate the text inside', let me know.
  truncateBasedOnHowManyLineBreaks = text => {
    if (text.split("\n").length > 4) {
      let index = 0;
      let cumulativeIndex = 0;
      let testText = text.slice();
      for (let i = index, j = 0; i < text.length, j < 4; j++) {
        index = testText.indexOf("\n") + 1;
        cumulativeIndex += index;
        testText = testText.slice(index);
      }
      cumulativeIndex--;
      text = text.slice(0, cumulativeIndex);
    }
    return text;
  };

  //action button, toggles journalPaper size between truncated and full size. Renders a blank space on journals that are too short, to maintain spacing.
  createExpandButton = largeJournal => {
    if (largeJournal) {
      return (
        <Grid item style={{ flex: 0 }}>
          <IconButton
            disabled={largeJournal ? false : true}
            style={{ height: "32px", width: "32px" }}
            onClick={() => this.toggleSize()}
          >
            <ZoomOutMap />
          </IconButton>
        </Grid>
      );
    } else {
      return (
        <Grid item style={{ flex: 0 }}>
          <IconButton
            disabled={largeJournal ? false : true}
            style={{ height: "32px", width: "32px" }}
          />
        </Grid>
      );
    }
  };

  //toggles favorite-ness of journals
  createFavoriteButton = () => {
    return (
      <Grid item style={{ flex: 1 }}>
        <IconButton
          style={{ height: "32px", width: "32px" }}
          onClick={() => console.log("createFavoriteButton Clicked")}
        >
          {this.state.isFavorite<StarBorder />}
        </IconButton>
      </Grid>
    );
  };

  //deletes a journal
  createDeleteButton = () => {
    return (
      <Grid item style={{ flex: 1 }}>
        <IconButton
          style={{ height: "32px", width: "32px" }}
          onClick={() =>
            this.props.deleteJournal(
              this.props.id,
              this.props.shownJournalValue
            )}
        >
          <Clear />
        </IconButton>
      </Grid>
    );
  };

  toggleableJournals = () => {
    if (!this.state.isFullSize) {
      return (
        <div>
          <Paper className={this.props.classes.root} elevation={2}>
            <Grid container>
              <Grid item style={{ flex: 8 }}>
                <Typography variant="headline" component="h3">
                  {this.props.title}
                </Typography>
              </Grid>
              {this.createDeleteButton()}
              {this.createFavoriteButton()}
              {this.createExpandButton(true)}
            </Grid>
            <Typography component="h3">
              {this.reformatJsonDataWithLineBreaks(
                this.truncateBasedOnHowManyLineBreaks(
                  this.props.content.slice(0, 500) + "..."
                )
              )}
            </Typography>
          </Paper>
        </div>
      );
    } else {
      return (
        <div>
          <Paper className={this.props.classes.root} elevation={2}>
            <Grid container>
              <Grid item style={{ flex: 8 }}>
                <Typography variant="headline" component="h3">
                  {this.props.title}
                </Typography>
              </Grid>
              {this.createDeleteButton()}
              {this.createFavoriteButton()}
              {this.createExpandButton(true)}
            </Grid>
            <Typography component="h3">
              {this.reformatJsonDataWithLineBreaks(this.props.content)}
            </Typography>
          </Paper>
        </div>
      );
    }
  };

  createUntoggleableJournal = () => {
    return (
      <div>
        <Paper className={this.props.classes.root} elevation={2}>
          <Grid container>
            <Grid item style={{ flex: 8 }}>
              <Typography variant="headline" component="h3">
                {this.props.title}
              </Typography>
            </Grid>
            {this.createDeleteButton()}
            {this.createFavoriteButton()}
            {this.createExpandButton(false)}
          </Grid>
          <Typography component="h3">
            {this.reformatJsonDataWithLineBreaks(
              this.truncateBasedOnHowManyLineBreaks(this.props.content)
            )}
          </Typography>
        </Paper>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    return this.props.content.length > 500 ||
      this.props.content.split("\n").length > 3
      ? this.toggleableJournals()
      : this.createUntoggleableJournal();
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
