import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoginDrawer from "./login/LoginDrawer";
import JournalTabs from "./journalTabs/JournalTabs";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2

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

class SimpleAppBar extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    // console.log(this.props);
    const { classes } = this.props;
    const { value } = this.state;
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
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={() => this.props.logoutLink()}
            disableRipple={true}
            disableFocusRipple={true}
          >
            Logout
          </Button>
        </Toolbar>
        <Divider />
      </AppBar>
    ) : (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ flex: 6 }}>
            {text}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={() => this.props.openLoginDrawer()}
            disableRipple={true}
            disableFocusRipple={true}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);

// <AppBar position="static" color="default">
//           <Tabs
//             value={value}
//             onChange={this.handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             scrollable
//             scrollButtons="auto"
//           >
//             <Tab label="Item One" />
//             <Tab label="Item Two" />
//             <Tab label="Item Three" />
//             <Tab label="Item Four" />
//             <Tab label="Item Five" />
//             <Tab label="Item Six" />
//             <Tab label="Item Seven" />
//           </Tabs>
//         </AppBar>
//         {value === 0 && <TabContainer>Item One</TabContainer>}
//         {value === 1 && <TabContainer>Item Two</TabContainer>}
//         {value === 2 && <TabContainer>Item Three</TabContainer>}
//         {value === 3 && <TabContainer>Item Four</TabContainer>}
//         {value === 4 && <TabContainer>Item Five</TabContainer>}
//         {value === 5 && <TabContainer>Item Six</TabContainer>}
//         {value === 6 && <TabContainer>Item Seven</TabContainer>}

// <Toolbar>
//   <Typography variant="title" color="inherit" style={{ flex: 6 }}>
//     {text}
//   </Typography>
//   {props.currentUser.length !== 0 ? (
//     <Button
//       variant="contained"
//       color="primary"
//       className={classes.loginButton}
//       onClick={() => props.logoutLink()}
//       disableRipple={true}
//       disableFocusRipple={true}
//     >
//       Logout
//     </Button>
//   ) : (
//     <Button
//       variant="contained"
//       color="primary"
//       className={classes.loginButton}
//       onClick={() => props.openLoginDrawer()}
//       disableRipple={true}
//       disableFocusRipple={true}
//     >
//       Login
//     </Button>
//   )}
// </Toolbar>
