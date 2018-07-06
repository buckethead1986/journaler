import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const styles = theme => ({
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
  }
});

class TemporaryDrawer extends React.Component {
  state = {
    right: false,
    username: "",
    password: "",
    loginError: false,
    signup: false
  };

  //toggles logindrawer state open or closed.  If 'login' button was clicked, changes signup state so login form is rendered.  If 'signup' was clicked, rendered signup form first
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.loginDrawerOpen !== this.props.loginDrawerOpen &&
      nextProps.fromHomePage === true
    ) {
      this.setState({
        right: nextProps.loginDrawerOpen,
        signup: true,
        username: "",
        password: ""
      });
    } else if (nextProps.loginDrawerOpen !== this.props.loginDrawerOpen) {
      this.setState({
        right: nextProps.loginDrawerOpen,
        signup: false,
        username: "",
        password: ""
      });
    }
  }

  //switches login and signup forms, and clears username/password state
  toggleSignup = () => {
    this.setState(prevState => {
      return {
        signup: !prevState.signup,
        username: "",
        password: "",
        loginError: false
      };
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    this.authenticateUser();
  };

  handleSignup = e => {
    e.preventDefault();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const settings = this.props.store.getState().defaultSettings;
    const body = {
      username: this.state.username,
      password: this.state.password,
      settings: JSON.stringify(settings)
    };
    fetch(`${this.props.store.getState().url}/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user: body })
    })
      .then(res => res.json())
      .then(json => {
        if (json.id !== null) {
          this.authenticateUser();
        } else {
          this.setState({
            loginError: true
          });
        }
      });
  };

  //authenticates the User. Sets jwt token if authenticated and fetchs user and current user information, otherwise modifies state to produce error in renderLoginForm.
  authenticateUser = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(`${this.props.store.getState().url}/auth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
          this.setState({ loginError: false }, () => {
            this.props.fetchUsersAndCurrentUser();
            this.props.openLoginDrawer();
          });
        } else {
          this.setState({
            loginError: true
          });
        }
      });
  };

  //if this.state.signup is true, a new user signup form is rendered. If false (default), a login form is rendered.  The forms are almost identical, with a few differences in methods called or Button labels.
  renderLoginDrawer = classes => {
    let loginOrSignupDrawer;
    if (this.state.signup) {
      loginOrSignupDrawer = (
        <Grid align="center">
          <Typography
            variant="headline"
            component="h3"
            className={classes.typography}
          >
            Signup a New User
          </Typography>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={e => this.handleSignup(e)}
          >
            {this.renderLoginForm(classes, "signup")}
            <Button variant="raised" color="primary" type="submit">
              Login
            </Button>
          </form>

          <Button
            variant="raised"
            color="default"
            className={classes.button}
            onClick={() => this.toggleSignup()}
          >
            Back to Login
          </Button>
        </Grid>
      );
    } else {
      loginOrSignupDrawer = (
        <Grid align="center">
          <Typography
            variant="headline"
            component="h3"
            className={classes.typography}
          >
            Login
          </Typography>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={e => this.handleLogin(e)}
          >
            {this.renderLoginForm(classes, "login")}
            <Button variant="raised" color="primary" type="submit">
              Login
            </Button>
          </form>
          <Button
            variant="raised"
            color="default"
            className={classes.button}
            onClick={() => this.toggleSignup()}
          >
            Create a New User
          </Button>
        </Grid>
      );
    }
    return loginOrSignupDrawer;
  };

  //renders input textfields with errors if a login or signup attempt has an error (if a username is already taken, or an incorrect username/password combo is attempted)
  renderLoginForm = (classes, loginOrSignup) => {
    let loginOrSignupForm;
    if (this.state.loginError) {
      loginOrSignupForm = (
        <Grid>
          <Grid>
            <TextField
              error
              autoFocus
              id="username"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange("username")}
              margin="normal"
            />
          </Grid>
          <Grid>
            <TextField
              error
              id="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              type="password"
              onChange={this.handleChange("password")}
              margin="normal"
            />
          </Grid>
          <Grid>
            {loginOrSignup === "login" ? (
              <Typography variant="subheading" component="h5" color="secondary">
                Incorrect Username or Password
              </Typography>
            ) : (
              <Typography variant="subheading" component="h5" color="secondary">
                Username is already taken
              </Typography>
            )}
          </Grid>
        </Grid>
      );
    } else {
      loginOrSignupForm = (
        <Grid>
          <Grid>
            <TextField
              autoFocus
              id="username"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange("username")}
              margin="normal"
            />
          </Grid>
          <Grid>
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              type="password"
              onChange={this.handleChange("password")}
              margin="normal"
            />
          </Grid>
        </Grid>
      );
    }
    return loginOrSignupForm;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={e => {
            this.props.openLoginDrawer();
          }}
        >
          <div>{this.renderLoginDrawer(classes)}</div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
