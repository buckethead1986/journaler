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

class TemporaryDrawer extends React.Component {
  state = {
    right: false
    // username: "",
    // password: "",
    // loginError: false,
    // signup: false
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

  // handleLogin = e => {
  //   e.preventDefault();
  //   this.authenticateUser();
  // };
  //
  // handleSignup = e => {
  //   e.preventDefault();
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   };
  //   const body = {
  //     username: this.state.username,
  //     password: this.state.password
  //   };
  //   fetch(`${this.props.url}/users`, {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify({ user: body })
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (json.id !== null) {
  //         this.authenticateUser();
  //       } else {
  //         this.setState({
  //           loginError: true
  //         });
  //       }
  //     });
  // };

  //authenticates the User. Sets jwt token if authenticated and fetchs user and current user information, otherwise modifies state to produce error in renderLoginForm.
  // authenticateUser = () => {
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   };
  //   const body = {
  //     username: this.state.username,
  //     password: this.state.password
  //   };
  //   fetch(`${this.props.url}/auth`, {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (!json.error) {
  //         localStorage.setItem("token", json.jwt);
  //         this.setState({ loginError: false }, () => {
  //           this.props.fetchUsersAndCurrentUser();
  //           this.props.openLoginDrawer();
  //         });
  //       } else {
  //         this.setState({
  //           loginError: true
  //         });
  //       }
  //     });
  // };

  //if this.state.signup is true, a new user signup form is rendered. If false (default), a login form is rendered.  The forms are almost identical, with a few differences in methods called or Button labels.
  renderSettingsDrawer = classes => {
    // let loginOrSignupDrawer;
    // if (this.state.signup) {
    //   loginOrSignupDrawer = (
    //     <Grid align="center">
    //       <Typography
    //         variant="headline"
    //         component="h3"
    //         className={classes.typography}
    //       >
    //         Signup a New User
    //       </Typography>
    //       <form
    //         className={classes.container}
    //         noValidate
    //         autoComplete="off"
    //         onSubmit={e => this.handleSignup(e)}
    //       >
    //         {this.renderLoginForm(classes, "signup")}
    //         <Button variant="raised" color="primary" type="submit">
    //           Login
    //         </Button>
    //       </form>
    //     </Grid>
    //   );
    // } else {
    //   loginOrSignupDrawer = (
    // let settingsForm = (
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
    // return settingsForm;
    // );
    // }
    // return loginOrSignupDrawer;
  };

  // <Tab
  //   key={`${getMonthWord(month)} ${i}`}
  //   style={styles.tabRoot}
  //   label={`${getMonthWord(month)} ${i}`}
  //   icon={<CheckBox style={{ color: "#33cc00" }} />}
  // />

  renderFormTemplate = (classes, name, icon) => {
    // console.log(icon);
    //basic template, modify a few items to change colors for each item.
    let uppercaseName = name.toUpperCase();
    const TagName = icon;
    console.log(TagName, icon);
    return (
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <TagName style={{ color: this.state[name] }} />
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

  // //renders input textfields with errors if a login or signup attempt has an error (if a username is already taken, or an incorrect username/password combo is attempted)
  // renderLoginForm = (classes, loginOrSignup) => {
  //   // let loginOrSignupForm;
  //   // if (this.state.loginError) {
  //   //   loginOrSignupForm = (
  //   //     <Grid>
  //   //       {this.renderFormTemplate(classes, "color", "CheckBox")}
  //   //       {this.renderFormTemplate(classes, "Alpha", "CheckBox")}
  //   //       {this.renderFormTemplate(classes, "Beta", "CheckBoxOutlineBlank")}
  //   //
  //   //       <Grid>
  //   //         {loginOrSignup === "login" ? (
  //   //           <Typography variant="subheading" component="h5" color="secondary">
  //   //             Incorrect Username or Password
  //   //           </Typography>
  //   //         ) : (
  //   //           <Typography variant="subheading" component="h5" color="secondary">
  //   //             Username is already taken
  //   //           </Typography>
  //   //         )}
  //   //       </Grid>
  //   //     </Grid>
  //   //   );
  //   // } else {
  //   let loginOrSignupForm = (
  //     <Grid>
  //       {this.renderFormTemplate(classes, "color", "CheckBox")}
  //       {this.renderFormTemplate(classes, "Alpha", "CheckBox")}
  //       {this.renderFormTemplate(classes, "Beta", "CheckBoxOutlineBlank")}
  //     </Grid>
  //   );
  //   // }
  //   return loginOrSignupForm;
  // };

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

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
