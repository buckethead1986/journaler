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
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData";

const styles = theme => ({
  list: {
    width: 250
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
    loginError: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        right: nextProps.loginDrawerOpen
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(`${this.props.url}/auth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
          this.setState({ loginError: false });
        } else {
          this.setState({
            loginError: true
          });
        }
      });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
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
          {this.state.loginError ? (
            <Grid>
              <Grid>
                <TextField
                  error
                  id="existingUsername"
                  label="Username"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleChange("existingUsername")}
                  margin="normal"
                />
              </Grid>
              <Grid>
                <TextField
                  error
                  id="existingPassword"
                  label="Password"
                  className={classes.textField}
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange("existingPassword")}
                  margin="normal"
                />
              </Grid>
              <Grid>
                <Typography
                  variant="subheading"
                  component="h5"
                  color="secondary"
                >
                  Username and/or Password Incorrect
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <Grid>
                <TextField
                  id="existingUsername"
                  label="Username"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleChange("existingUsername")}
                  margin="normal"
                />
              </Grid>

              <Grid>
                <TextField
                  id="existingPassword"
                  label="Password"
                  className={classes.textField}
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange("existingPassword")}
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}
          <Button
            variant="raised"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Grid>
    );

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={() => this.props.openLoginDrawer()}
        >
          <div
            onClick={() => this.props.openLoginDrawer()}
            onKeyDown={() => this.props.openLoginDrawer()}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
