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
    right: false
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
          onSubmit={e => this.handleLogin(e)}
        >
          {this.renderFormTemplate(classes, "color", CheckBox)}
          {this.renderFormTemplate(classes, "Alpha", CheckBox)}
          {this.renderFormTemplate(classes, "Beta", CheckBoxOutlineBlank)}
          <Button variant="raised" color="primary" type="submit">
            Submit Settings
          </Button>
        </form>
      </Grid>
    );
  };

  renderFormTemplate = (classes, name, icon) => {
    let uppercaseName = name.toUpperCase();
    const IconTagName = icon;
    return (
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <IconTagName style={{ color: this.state[name] }} />
          </Grid>
          <Grid item>
            <TextField
              error
              id={name}
              label={uppercaseName}
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange(`${name}`)}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  render() {
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
