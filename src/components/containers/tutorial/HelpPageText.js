import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  FormControlLabel
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Clear from "@material-ui/icons/Clear";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ZoomOutMap from "@material-ui/icons/ZoomOutMap";
import Favorite from "@material-ui/icons/Favorite";

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
  },
  inputField: {
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5,
    width: 150
  },
  checkbox: {
    color: "default",
    "&$checked": {
      color: "#3F51B5"
    }
  },
  checked: {}
});

class HelpPage extends React.Component {
  state = {
    colors: {},
    useDummyData: false
  };

  componentDidMount() {
    this.setState({
      colors: this.props.colors,
      useDummyData: this.props.colors.useDummyData
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colors !== this.state.colors) {
      this.setState({
        colors: nextProps.colors,
        useDummyData: nextProps.colors.useDummyData
      });
    }
  }

  //updates state for deeply nested attributes
  handleChange = name => event => {
    let value = event.target.value;
    if (name === "wordCountGoal") {
      value = this.checkForNegativesAndNaN(name, parseInt(value, 10));
    }

    let newColorsState = Object.assign({}, this.state.colors);
    newColorsState[`${name}`] = value;
    this.setState({
      colors: newColorsState
    });
  };

  toggleDummyDataCheckbox = () => {
    let newColorsState = Object.assign({}, this.state.colors);
    newColorsState["useDummyData"] = !newColorsState["useDummyData"];
    this.setState({
      colors: newColorsState,
      useDummyData: newColorsState["useDummyData"]
    });
  };

  checkForNegativesAndNaN = (name, value) => {
    if (value < 0 || isNaN(value)) {
      return this.state.colors.wordCountGoal;
    } else {
      return value;
    }
  };

  splitAroundUppercase = title => {
    for (let i = 0; i < title.length; i++) {
      if (title[i] === title[i].toUpperCase()) {
        title = title.slice(0, i) + " " + title.slice(i);
        i += 2;
      }
    }
    title = title[0].toUpperCase() + title.slice(1);
    return title;
  };

  renderTabColorChangeInput = classes => {
    return (
      <Grid item xs={3}>
        <TextField
          className={classes.inputField}
          id="tab-color"
          placeholder="Tab Color"
          onChange={this.handleChange("tabColor")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CheckCircle style={{ color: this.state.colors.tabColor }} />
              </InputAdornment>
            )
          }}
        />
      </Grid>
    );
  };

  renderColorChangeInput = (classes, name) => {
    return (
      <Grid item xs={3}>
        <TextField
          className={classes.inputField}
          id={name}
          placeholder={this.splitAroundUppercase(name)}
          onChange={this.handleChange(`${name}`)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div
                  style={{
                    backgroundColor: this.state.colors[`${name}`],
                    height: "20px",
                    width: "20px",
                    border: "2px solid black",
                    borderRadius: "5px 5px 5px 5px"
                  }}
                />
              </InputAdornment>
            )
          }}
        />
      </Grid>
    );
  };

  renderWordCountChangeInput = classes => {
    return (
      <Grid item xs={3}>
        <TextField
          className={classes.inputField}
          style={{ height: "25px" }}
          id="word-count-goal"
          placeholder={`Current goal: ${this.state.colors.wordCountGoal}`}
          onChange={this.handleChange("wordCountGoal")}
        />
      </Grid>
    );
  };

  renderForm = (classes, colors) => {
    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={e => {
          this.props.changeColorSettings(e, this.state.colors);
          document.getElementById("tab-color").value = "";
          document.getElementById("buttonColor").value = "";
          document.getElementById("background").value = "";
          document.getElementById("word-count-goal").value = "";
        }}
      >
        <Grid container spacing={0} alignItems="flex-end">
          {this.renderWordCountChangeInput(classes)}
          {this.renderTabColorChangeInput(classes)}
          {this.renderColorChangeInput(classes, "buttonColor")}
          {this.renderColorChangeInput(classes, "background")}
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.useDummyData}
                  onChange={() => this.toggleDummyDataCheckbox()}
                  value="useDummyData"
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked
                  }}
                />
              }
              label="Include pre-made journals"
            />
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Button
                variant="raised"
                style={{
                  color: colors.buttonText,
                  backgroundColor: colors.buttonColor
                }}
                disableRipple={true}
                disableFocusRipple={true}
                type="submit"
              >
                Submit Settings
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="raised"
                style={{
                  color: colors.buttonText,
                  backgroundColor: colors.buttonColor
                }}
                disableRipple={true}
                disableFocusRipple={true}
                onClick={e =>
                  this.props.changeColorSettings(
                    e,
                    this.props.store.getState().defaultSettings
                  )}
              >
                Reset to default
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  };

  render() {
    const { classes, colors } = this.props;
    return (
      <Grid className={classes.typography}>
        <Typography
          variant="headline"
          component="h3"
          style={{ textAlign: "center" }}
        />

        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline">What do I do?</Typography>
          <Typography variant="subheading">
            Write whatever you want in the space to the right. When you're
            satisfied, hit 'Submit' at the bottom to save your work. Click on a
            day in the scrollbar above to see Journals from that day.
          </Typography>
          <Typography variant="subheading" />
        </Paper>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline">
            What are all the circles at the top?
          </Typography>
          <Typography variant="subheading">
            Journaler keeps track of your writing habits, with quick access to
            all journals from the past 30 days.
          </Typography>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <RadioButtonUnchecked style={{ color: colors.tabColor }} />
            </Grid>
            <Grid item>
              <Typography variant="subheading">
                Nothing was written on this day
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <CheckCircle style={{ color: colors.tabColor }} />
            </Grid>
            <Grid item>
              <Typography variant="subheading">
                This day has Journals.
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Favorite style={{ color: colors.tabColor }} />
            </Grid>
            <Grid item>
              <Typography variant="subheading">
                You met your word count goal for this day! Nice job!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline">
            What do the buttons on each Journal do?
          </Typography>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Clear />
            </Grid>
            <Grid item>
              <Typography variant="subheading">
                Deletes the Journal (be careful, this can't be undone)
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Edit />
            </Grid>
            <Grid item>
              <Typography variant="subheading">Edit the Journal</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <ZoomOutMap />
            </Grid>
            <Grid item>
              <Typography variant="subheading">
                Toggles the fullsize Journal on or off
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline">
            I want to change my word count goal
          </Typography>
          <Typography variant="subheading">
            No problem. Change it here, or change some website colors (accepts
            hex, rgb, 'purple', etc)
          </Typography>
          <Typography variant="subheading" />
          {this.renderForm(classes, colors)}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(HelpPage);
