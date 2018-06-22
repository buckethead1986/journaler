import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoginDrawer from "./login/LoginDrawer";

const styles = theme => ({
  root: {
    flexGrow: 1
    // display: "flex"
    // zIndex: 1,
    // overflow: "hidden",
    // position: "relative"
  },
  loginButton: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    // marginLeft: theme.spacing.unit * 3,

    // marginRight: 255,
    flex: 0

    // marginLeft: window.innerWidth / 6,
    // marginRight: window.innerWidth / 6,
    // marginBottom: theme.spacing.unit * 2
  },
  flex: {
    flex: 1
  }
});

function SimpleAppBar(props) {
  const { classes } = props;
  let text;
  if (props.currentUser.length !== 0) {
    text = `Welcome, ${props.currentUser[0].username}`;
  } else {
    text = "Journaler";
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ flex: 6 }}>
            {text}
          </Typography>
          {props.currentUser.length !== 0 ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.loginButton}
              onClick={() => props.logoutLink()}
              disableRipple={true}
              disableFocusRipple={true}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.loginButton}
              onClick={() => props.openLoginDrawer()}
              disableRipple={true}
              disableFocusRipple={true}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
