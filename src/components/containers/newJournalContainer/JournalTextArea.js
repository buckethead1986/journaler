import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import MenuItem from "@material-ui/core/MenuItem";
// import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  submitButton: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    flex: 1,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  text: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    maxHeight: `${window.innerHeight}` - 400 + "px"
  }),
  title: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3
  }),
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class TextFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textTitle: props.textTitle || "",
      textArea: props.textArea || "",
      hasContent: props.edit || false,
      emptySubmit: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.textArea !== this.props.textArea) {
      this.setState({
        textTitle: nextProps.textTitle,
        textArea: nextProps.textArea,
        hasContent: true
      });
    }
  }

  //Posts Journal entry to API.  If the title is blank, changes it to 'Untitled', then calls fetchJournals to fetch updated journals list for this user.
  //emptySubmit is a check for content not to be blank.  If a submit is attempted with no content, it fails and the submit button is modified.
  postJournalEntry = (user_id, title, content) => {
    if (this.state.hasContent) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      let body;
      if (this.state.textTitle === "") {
        body = {
          journal: { user_id, title: "Untitled", content }
        };
      } else {
        body = {
          journal: { user_id, title, content }
        };
      }
      fetch(`${this.props.store.getState().url}/journals`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })
        .then(res => res.json())
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

  //this can be refactored into postJournalEntry
  editJournalEntry = (user_id, title, content, id) => {
    // console.log(
    //   "edit journal entry",
    //   user_id,
    //   title,
    //   content,
    //   this.props.journalId
    // );
    if (this.state.hasContent) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      let body;
      if (this.state.textTitle === "") {
        body = {
          journal: { user_id, title: "Untitled", content, id }
        };
      } else {
        body = {
          journal: { user_id, title, content, id }
        };
      }
      fetch(
        `${this.props.store.getState().url}/journals/${this.props.journalId}`,
        {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(body)
        }
      )
        .then(res => res.json())
        .then(() =>
          this.setState({
            textTitle: "",
            textArea: ""
          })
        )
        .then(() => this.props.fetchJournals(this.props.shownJournalValue));
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
      () => {
        this.checkForContent();
        this.props.setTextAreaAndCallAFunction(
          this.state.textTitle,
          this.state.textArea,
          this.props.journalId || "",
          {}
        );
      }
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

  renderSubmitButton = colors => {
    if (this.props.currentUser) {
      return this.state.emptySubmit ? (
        <Button
          variant="contained"
          color="secondary"
          className={this.props.classes.submitButton}
          onClick={() =>
            this.postJournalEntry(
              this.props.currentUser.id,
              this.state.textTitle,
              this.state.textArea
            )}
        >
          Content required!
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{
            color: colors.buttonTextColor,
            backgroundColor: colors.buttonBackgroundColor
          }}
          className={this.props.classes.submitButton}
          onClick={() => {
            this.props.edit
              ? this.editJournalEntry(
                  this.props.currentUser.id,
                  this.state.textTitle,
                  this.state.textArea,
                  this.props.journalId
                )
              : this.postJournalEntry(
                  this.props.currentUser.id,
                  this.state.textTitle,
                  this.state.textArea
                );
          }}
        >
          {this.props.edit ? "Edit Journal" : "Submit"}
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          style={{
            color: colors.buttonTextColor,
            backgroundColor: colors.buttonBackgroundColor
          }}
          className={this.props.classes.submitButton}
          onClick={() =>
            this.props.openLoginDrawer(
              true,
              this.state.textTitle,
              this.state.textArea
            )}
        >
          Signup to Save Journal
        </Button>
      );
    }
  };

  render() {
    const { classes, colors } = this.props;

    return (
      <div>
        <Paper
          className={[classes.text, classes.title].join(" ")}
          elevation={4}
        >
          <Input
            id="text-title"
            value={this.state.textTitle}
            onChange={this.handleChange("textTitle")}
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
            fullWidth={true}
            placeholder="Start Writing"
            autoFocus={true}
            disableUnderline={true}
          />
        </Paper>
        <div style={{ display: "flex" }}>
          {this.renderSubmitButton(colors)}

          {this.props.currentUser ? (
            <div style={{ flex: 5 }} />
          ) : (
            <div style={{ flex: 3 }} />
          )}
        </div>
      </div>
    );
  }
}
TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
