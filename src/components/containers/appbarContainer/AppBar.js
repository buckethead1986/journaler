import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import LoginDrawer from "../login/LoginDrawer";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit * 2
  },
  loginButton: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    flex: 0
  },
  flex: {
    flex: 1
  },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabSelected: {}
});

class SimpleAppBar extends React.Component {
  // state = {
  //   value: 0
  // };

  componentWillReceiveProps(nextProps) {
    if (this.props.tabs.length !== nextProps.tabs.length) {
      this.props.changeShownJournalValue(nextProps.tabs.length - 1);
    }
  }

  handleChange = (event, value) => {
    this.props.changeShownJournalValue(value);
  };

  renderButton = (text, callbackFunction, classes, colors) => {
    return (
      <Button
        variant="contained"
        style={{
          color: colors.buttonTextColor || "default",
          backgroundColor: colors.buttonBackgroundColor || "default"
        }}
        className={classes.loginButton}
        onClick={() => callbackFunction()}
        disableRipple={true}
        disableFocusRipple={true}
      >
        {text}
      </Button>
    );
  };

  render() {
    const { classes, colors } = this.props;
    // const { value } = this.state;
    let text;
    if (this.props.currentUser.length !== 0) {
      text = `Welcome, ${this.props.currentUser.username}`;
    } else {
      text = "Journaler";
    }
    return this.props.currentUser.length !== 0 ? (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" style={{ flex: 6 }}>
            {text}
          </Typography>
          {this.renderButton(
            "Settings",
            this.props.openSettingsDrawer,
            classes,
            colors
          )}
          {this.renderButton("Logout", this.props.logoutLink, classes, colors)}
        </Toolbar>
        <Divider />
        <Tabs
          value={this.props.shownJournalValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
          classes={{
            root: this.props.classes.tabsRoot,
            indicator: this.props.classes.tabsIndicator
          }}
        >
          {this.props.tabs}
        </Tabs>
      </AppBar>
    ) : (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ flex: 6 }}>
            {text}
          </Typography>
          {this.renderButton(
            "Login",
            this.props.openLoginDrawer,
            classes,
            colors
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
