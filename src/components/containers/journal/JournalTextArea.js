import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
// import ReactDOM from "react-dom";

const styles = theme => ({
  submitButton: {
    margin: theme.spacing.unit,
    marginLeft: window.innerWidth / 6,
    flex: 1,
    marginRight: window.innerWidth / 6,
    marginBottom: theme.spacing.unit * 2
  },
  // loginButton: {
  //   margin: theme.spacing.unit,
  //
  //   marginRight: window.innerWidth / 6,
  //   flex: 1,
  //
  //   // marginLeft: window.innerWidth / 6,
  //   // marginRight: window.innerWidth / 6,
  //   marginBottom: theme.spacing.unit * 2
  // },
  title: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 2,
    marginLeft: window.innerWidth / 6,
    marginRight: window.innerWidth / 6
  }),
  text: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit,
    marginLeft: window.innerWidth / 6,
    marginRight: window.innerWidth / 6
  }),
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit

    // width: 400 //overrides fullWidth prop of textField
  }
  // menu: {
  //   width: 200
  // }
});

class TextFields extends React.Component {
  state = {
    textTitle: "",
    textArea: "",
    hasContent: false,
    emptySubmit: false
  };

  postJournalEntry = (user_id, title, content) => {
    if (this.state.hasContent) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      const body = {
        journal: { user_id, title, content }
      };
      fetch(`${this.props.url}/journals`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(() =>
          this.setState({
            textTitle: "",
            textArea: ""
          })
        )
        .then(() => this.props.fetchJournals());
    } else {
      this.setState({
        emptySubmit: true
      });
    }
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => this.checkForContent()
    );
  };

  //Prevents submissions with empty content, also triggers submit button change.
  checkForContent = () => {
    if (this.state.textArea === "" && this.state.hasContent === true) {
      this.setState({
        hasContent: false
      });
    } else if (this.state.textArea !== "" && this.state.hasContent === false) {
      this.setState({
        hasContent: true,
        emptySubmit: false
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.title} elevation={4}>
          <Input
            id="text-title"
            value={this.state.textTitle}
            onChange={this.handleChange("textTitle")}
            className={classes.textField}
            fullWidth={true}
            placeholder="Title (optional)"
            disableUnderline={true}
          />
        </Paper>
        <Paper className={classes.text} elevation={4}>
          <Input
            id="multiline-text-area"
            multiline
            rows="30"
            value={this.state.textArea}
            onChange={this.handleChange("textArea")}
            className={classes.textField}
            fullWidth={true}
            placeholder="Start Writing"
            autoFocus={true}
            disableUnderline={true}
          />
        </Paper>
        <div style={{ display: "flex" }}>
          {this.state.emptySubmit ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.submitButton}
              onClick={() =>
                this.postJournalEntry(
                  4,
                  this.state.textTitle,
                  this.state.textArea
                )}
            >
              Content can't be empty
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={() =>
                this.postJournalEntry(
                  4,
                  this.state.textTitle,
                  this.state.textArea
                )}
            >
              Submit
            </Button>
          )}

          <div style={{ flex: 6 }} />
        </div>
      </div>
    );
  }
}
TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
