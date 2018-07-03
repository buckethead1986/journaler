import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ZoomOutMap from "@material-ui/icons/ZoomOutMap";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import Clear from "@material-ui/icons/Clear";
import Create from "@material-ui/icons/Create";

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
    isExpanded: false
  };

  toggleExpanded = () => {
    this.setState(prevState => {
      return { isExpanded: !prevState.isExpanded };
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
      for (let j = 0; j < 4; j++) {
        index = testText.indexOf("\n") + 1;
        cumulativeIndex += index;
        testText = testText.slice(index);
      }
      cumulativeIndex--;
      text = text.slice(0, cumulativeIndex);
    }
    return text;
  };

  callDelete = () => {
    this.props.deleteJournal(this.props.id, this.props.shownJournalValue);
  };

  callFavorite = () => {
    console.log("favorite");
  };

  callJournalStatsLink = () => {
    this.props.journalStatsLink(this.props.id);
  };
  callJournalEditLink = () => {
    this.props.journalEditLink(this.props.id);
  };

  createIconButtonsList = isLargeJournal => {
    return (
      <Grid container>
        <Grid item style={{ flex: 8 }}>
          <Typography variant="headline" component="h3">
            {this.props.title}
          </Typography>
        </Grid>
        {this.createIconButton("Delete", Clear, this.callDelete)}
        {this.createIconButton("Favorite", StarBorder, this.callFavorite)}
        {this.createIconButton("Stats", Star, this.callJournalStatsLink)}
        {this.createIconButton("Edit", Create, this.callJournalEditLink)}
        {this.createExpandButton(isLargeJournal)}
      </Grid>
    );
  };

  //template for rendering iconButtons on each JournalPaper. 'type' is just for human readability
  createIconButton = (type, icon, callbackFunction) => {
    let IconTagName = icon;

    return (
      <Grid item style={{ flex: 1 }}>
        <IconButton
          style={{ height: "32px", width: "32px" }}
          onClick={() => callbackFunction()}
        >
          <IconTagName />
        </IconButton>
      </Grid>
    );
  };

  //action button, toggles journalPaper size between truncated and full size. Renders a blank space on journals that are too short, to maintain spacing.
  createExpandButton = largeJournal => {
    if (largeJournal) {
      return (
        <Grid item style={{ flex: 0 }}>
          <IconButton
            style={{ height: "32px", width: "32px" }}
            onClick={() => this.toggleExpanded()}
          >
            <ZoomOutMap />
          </IconButton>
        </Grid>
      );
    } else {
      return (
        <Grid item style={{ flex: 0 }}>
          <IconButton
            style={{ height: "32px", width: "32px" }}
            disabled={true}
          />
        </Grid>
      );
    }
  };

  renderJournals = (isLargeJournal, journalContent) => {
    return (
      <div>
        <Paper className={this.props.classes.root} elevation={2}>
          {this.createIconButtonsList(isLargeJournal)}
          <Typography component="h3">
            {this.reformatJsonDataWithLineBreaks(journalContent)}
          </Typography>
        </Paper>
      </div>
    );
  };

  createExpandableJournal = () => {
    if (!this.state.isExpanded) {
      return this.renderJournals(
        true,
        this.truncateBasedOnHowManyLineBreaks(
          this.props.content.slice(0, 500) + "..."
        )
      );
    } else {
      return this.renderJournals(true, this.props.content);
    }
  };

  createStaticJournal = () => {
    return this.renderJournals(
      false,
      this.truncateBasedOnHowManyLineBreaks(this.props.content)
    );
  };

  render() {
    return this.props.content.length > 500 ||
      this.props.content.split("\n").length > 3
      ? this.createExpandableJournal()
      : this.createStaticJournal();
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);