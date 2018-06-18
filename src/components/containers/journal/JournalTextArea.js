import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  title: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 2
    // marginLeft: window.innerWidth / 10,
    // marginRight: window.innerWidth / 10
  }),
  text: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2

    // marginLeft: window.innerWidth / 10,
    // marginRight: window.innerWidth / 10
  }),
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit

    // width: 400 //overrides fullWidth prop of textField
  },
  menu: {
    width: 200
  }
});

class TextFields extends React.Component {
  state = {
    name: "Cat in the Hat",
    age: "",
    textTitle: "",
    textArea: ""
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => console.log(this.state.textArea)
    );
  };

  //handle tab, prevent the default of switching the focus, onKeyDown add a tab space to state.  Not working how I want
  handleTab = event => {
    event.preventDefault();
    console.log("here", event.key);
    if (event.keyCode === 81) {
      console.log("here too");
      this.setState({ textArea: "hey" });
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
            // margin="none"
            placeholder="Title (optional)"
            disableUnderline={true}
          />
        </Paper>
        <Paper className={classes.text} elevation={4}>
          <Input
            id="multiline-text-area"
            // label="Multiline"
            multiline
            rows="20"
            // defaultValue="Default Value"
            value={this.state.multiline}
            onChange={this.handleChange("textArea")}
            onKeyDown={this.handleTab}
            className={classes.textField}
            // margin="none"
            fullWidth={true}
            placeholder="Start Writing"
            autoFocus={true}
            disableUnderline={true}
          />
        </Paper>
      </div>
    );
  }
}
TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
