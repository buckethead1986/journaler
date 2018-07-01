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
import SettingsSelector from "./SettingsSelector";

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
  },
  grid: {
    marginBottom: theme.spacing.unit * 3
  }
});

class SettingsDrawer extends React.Component {
  state = {
    right: false,
    hasJournalsColor: "",
    noJournalsColor: "",
    buttonTextColor: "",
    buttonBackgroundColor: "",
    backgroundColor: "",
    selectionSettings: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.settingsDrawerOpen !== this.props.settingsDrawerOpen) {
      this.setState({
        right: nextProps.settingsDrawerOpen,
        hasJournalsColor: nextProps.colors.hasJournalsColor,
        noJournalsColor: nextProps.colors.noJournalsColor,
        buttonTextColor: nextProps.colors.buttonTextColor,
        buttonBackgroundColor: nextProps.colors.buttonBackgroundColor,
        backgroundColor: nextProps.colors.backgroundColor
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  //modifies state based on preset theme selected in SettingsSelector, gets submitted when 'Submit Preset Settings' button is clicked.
  handleSelectorChange = selectionSettings => {
    this.setState({ selectionSettings });
  };

  renderSettingsDrawer = (classes, colors) => {
    return (
      <div>
        <Grid align="center" className={classes.grid}>
          <Typography variant="headline" className={classes.typography}>
            Preset Color Themes
          </Typography>
          <form
            onSubmit={e =>
              this.props.changeColorSettings(e, this.state.selectionSettings)}
          >
            <SettingsSelector
              handleSelectorChange={this.handleSelectorChange}
              colors={this.props.colors}
            />

            <Button
              variant="raised"
              style={{
                color: colors.buttonTextColor,
                backgroundColor: colors.buttonBackgroundColor
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Divider />
        <Grid align="center" className={classes.grid}>
          <Typography variant="headline" className={classes.typography}>
            Custom Color Settings
          </Typography>
          <Typography variant="body1" className={classes.typography}>
            Modify any or all, with hex, rgb, 'purple', etc.
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
            <Button
              variant="raised"
              style={{
                color: colors.buttonTextColor,
                backgroundColor: colors.buttonBackgroundColor
              }}
              type="submit"
            >
              Submit Specific Settings
            </Button>
          </form>
        </Grid>
      </div>
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
    const { classes, colors } = this.props;

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={e => {
            this.props.openSettingsDrawer();
          }}
        >
          <div>{this.renderSettingsDrawer(classes, colors)}</div>
        </Drawer>
      </div>
    );
  }
}

SettingsDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsDrawer);
