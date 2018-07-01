import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";

const styles = theme => ({
  list: {
    width: 250
  },
  button: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 200
  },
  typography: {
    marginTop: theme.spacing.unit * 3
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
});

class SettingsDrawer extends React.Component {
  state = {
    right: false,
    hasJournalsColor: this.props.colors[0] || "#33cc00",
    noJournalsColor: this.props.colors[1] || "#33cc00",
    buttonTextColor: this.props.colors[2] || "white",
    buttonBackgroundColor: this.props.colors[2] || "#3F51B5",
    backgroundColor: this.props.colors[3] || "white"
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.settingsDrawerOpen !== this.props.settingsDrawerOpen) {
      this.setState({
        right: nextProps.settingsDrawerOpen
      });
    }
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => console.log(this.state, name)
    );
  };

  //if this.state.signup is true, a new user signup form is rendered. If false (default), a login form is rendered.  The forms are almost identical, with a few differences in methods called or Button labels.
  renderSettingsDrawer = classes => {
    return (
      <Grid align="center">
        <Typography
          variant="headline"
          component="h3"
          className={classes.typography}
        >
          Settings
        </Typography>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={e =>
            this.props.changeColorSettings(e, {
              hasJournalsColor: this.state.hasJournalsColor,
              noJournalsColor: this.state.noJournalsColor,
              buttonTextColor: this.state.buttonTextColor,
              buttonBackgroundColor: this.state.buttonBackgroundColor,
              backgroundColor: this.state.backgroundColor
            })}
        >
          {this.renderIconTemplate(classes, "hasJournalsColor", CheckBox)}
          {this.renderIconTemplate(
            classes,
            "noJournalsColor",
            CheckBoxOutlineBlank
          )}
          {this.renderColorTemplate(classes, "buttonTextColor")}
          {this.renderColorTemplate(classes, "buttonBackgroundColor")}
          {this.renderColorTemplate(classes, "backgroundColor")}
          <Button variant="raised" color="primary" type="submit">
            Submit Settings
          </Button>
        </form>
      </Grid>
    );
  };

  renderIconTemplate = (classes, name, icon) => {
    const IconTagName = icon;
    return (
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <IconTagName style={{ color: this.state[name] }} />
          </Grid>
          <Grid item>
            <TextField
              id={name}
              label={this.splitAroundUppercase(name)}
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange(`${name}`)}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  renderColorTemplate = (classes, name) => {
    return (
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <div
              style={{
                backgroundColor: this.state[name],
                height: "25px",
                width: "25px",
                border: "2px solid black",
                borderRadius: "5px 5px 5px 5px"
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id={name}
              label={this.splitAroundUppercase(name)}
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange(`${name}`)}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  // Takes a string, like 'hasJournalsColor', and makes it 'Has Journal Color', split around capitals and with the first character uppercase
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

  render() {
    console.log(this.props.colors);
    const { classes } = this.props;

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={e => {
            this.props.openSettingsDrawer();
          }}
        >
          <div>{this.renderSettingsDrawer(classes)}</div>
        </Drawer>
      </div>
    );
  }
}

SettingsDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsDrawer);
