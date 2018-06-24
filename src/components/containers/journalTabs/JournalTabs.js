import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
// import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import PhoneIcon from "@material-ui/icons/Phone";
// import CalendarToday from "@material-ui/icons/BugReport";
import CheckBoxOutline from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";
import Paper from "@material-ui/core/Paper";

let tabs = [];
let tabContainers = {};

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
    // width: "100%",
    // backgroundColor: theme.palette.background.paper
    backgroundColor: theme.palette.background.paper
  },
  // tabRoot: {
  //   textTransform: "initial",
  //   minWidth: 50,
  //   // fontWeight: theme.typography.fontWeightRegular,
  //   // marginRight: theme.spacing.unit * 4
  //   "&$tabSelected": {
  //     color: "#1890ff",
  //     fontWeight: theme.typography.fontWeightMedium
  //   },
  //   "&:focus": {
  //     color: "#40a9ff"
  //   }
  // },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabSelected: {},
  // root: {
  //   flexGrow: 1,
  //   backgroundColor: theme.palette.background.paper
  // },
  // tabsRoot: {
  //   borderBottom: '1px solid #e8e8e8',
  // },
  // tabsIndicator: {
  //   backgroundColor: "#1890ff"
  // },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    // fontWeight: theme.typography.fontWeightRegular,
    // marginRight: theme.spacing.unit * 4,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#1890ff"
      // fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  // tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0, //change this to alter which tab you start on
    tabs: [],
    tabContainers: {}
  };

  handleChange = (event, value) => {
    this.setState({ value, shownTab: value });
  };

  componentDidMount() {
    console.log(this.props.currentUser);
    let currentUser = this.props.currentUser;
    debugger;
    this.renderTabs(this.props.classes);
    // this.renderTabsTest(this.props.classes);
  }

  // renderTabsTest = classes => {
  //   let date = new Date();
  //   let journal = this.props.currentUser.journals[
  //     this.props.currentUser.journals.length - 1
  //   ];
  //
  // };

  //what if instead you get the journals, and turn that into an object, with keys 1-29, set at the moment as you figure out what 30 days (corresponding to the month youre showing) is.
  var arr = this.props.currentUser.journals
  var result = arr.reduce(function(map, obj) {
    map[obj.id] = {title: obj.title, content: obj.content, year: [obj.created_at.split("T")[0].split("-")[0]][0], month: [obj.created_at.split("T")[0].split("-")[1]][0], day: [obj.created_at.split("T")[0].split("-")[2]][0]}
    return map;
}, {});

  renderTabs = classes => {
    // let tabs = [];
    // let tabContainers = {};
    let valueCounter = 29;
    let journals = this.props.currentUser.journals.slice();
    let date = new Date();
    let previousMonthLength = this.daysInEachMonth(
      date.getMonth() - 1,
      date.getYear()
    );
    //journals will be created in chronological order, so iterate through them in reverse, if a day doesnt have a journal, render a blank tab, otherwise return a
    //full tab, up to 30.
    //Use 'today' to start, and then check the journals creation date, and fill in blank tabs for any non-written days.
    //'shift' journals off of a copy of the array iff theyre on the right day, otherwise fill in blank tabs

    //adding journal entries for this month from todays date, counting backwards
    for (let i = date.getDate(); i > 0; i--) {
      this.renderTabsDateCheck(journals, valueCounter, i, classes, date);
      journals.pop();
      valueCounter--;
    }

    let count = 30 - tabs.length;

    //'tabs' length is all the days of the current month, now adding journal entries in the previous month, up to 30 total
    for (let i = previousMonthLength, j = 0; j < count; i--, j++) {
      this.renderTabsDateCheck(journals, valueCounter, i, classes, date);
      journals.pop();
      valueCounter--;
    }

    this.setState({
      tabs: tabs,
      value: tabs.length - 1,
      tabContainers: tabContainers
    });
  };

  //Check that the journals array has items, and if the year, month, and day match the current tab iteration.
  //If so, adds a colorful tab to tabs, and adds the journal information to tabContainers
  renderTabsDateCheck = (journals, valueCounter, i, classes, date) => {
    if (
      journals.length > 0 &&
      parseInt(
        journals[journals.length - 1].created_at.split("T")[0].split("-")[0]
      ) === date.getFullYear() &&
      parseInt(
        journals[journals.length - 1].created_at.split("T")[0].split("-")[1] - 1
      ) === date.getMonth() &&
      parseInt(
        journals[journals.length - 1].created_at.split("T")[0].split("-")[2]
      ) === i
    ) {
      this.renderJournalTabView(journals, valueCounter, i, classes);
    } else {
      this.renderBlankTabView(valueCounter, i, classes);
    }
  };

  renderJournalTabView = (journals, valueCounter, i, classes) => {
    tabs.unshift(
      <Tab
        key={`Jun ${i}`}
        className={classes.tabRoot}
        label={`Jun ${i}`}
        icon={<CheckBox style={{ color: "#33cc00" }} />}
      />
    );
    //code here for multiple journals in a day
    tabContainers[valueCounter] = (
      <TabContainer>{journals[journals.length - 1].content}</TabContainer>
    );
  };

  renderBlankTabView = (valueCounter, i, classes) => {
    tabs.unshift(
      <Tab
        key={`Jun ${i}`}
        className={classes.tabRoot}
        label={`Jun ${i}`}
        icon={<CheckBoxOutline style={{ color: "#33cc00" }} />}
      />
    );
    tabContainers[valueCounter] = <TabContainer>No Journal Today</TabContainer>;
  };

  daysInEachMonth = (month, year) => {
    let days;
    switch (month) {
      case 0:
        days = 31;
        break;
      case 1:
        if (year === 2020 || year === 2024 || year === 2028) {
          days = 29;
        } else {
          days = 28;
        }
        break;
      case 2:
        days = 31;
        break;
      case 3:
        days = 30;
      case 4:
        days = 31;
        break;
      case 5:
        days = 30;
        break;
      case 6:
        days = 31;
        break;
      case 7:
        days = 31;
        break;
      case 8:
        days = 30;
        break;
      case 9:
        days = 31;
        break;
      case 10:
        days = 30;
        break;
      case 11:
        days = 31;
        break;
      default:
        days = 0;
        break;
    }
    return days;
  };

  // renderTabView = classes => {};
  //
  // renderTabContainers = value => {
  //   {
  //     value === 0 && <TabContainer>Item One</TabContainer>;
  //   }
  //   {
  //     value === 1 && <TabContainer>Item Two</TabContainer>;
  //   }
  //   {
  //     value === 2 && <TabContainer>Item Three</TabContainer>;
  //   }
  //   {
  //     value === 3 && <TabContainer>Item Four</TabContainer>;
  //   }
  //   {
  //     value === 4 && <TabContainer>Item Five</TabContainer>;
  //   }
  //   {
  //     value === 5 && <TabContainer>Bacon</TabContainer>;
  //   }
  //
  //   {
  //     value === 6 && <TabContainer>Item Seven</TabContainer>;
  //   }
  //   {
  //     value === 7 && <TabContainer>Item Eight</TabContainer>;
  //   }
  //   {
  //     value === 8 && <TabContainer>Item Nine</TabContainer>;
  //   }
  //   {
  //     value === 9 && <TabContainer>Item Ten</TabContainer>;
  //   }
  //   {
  //     value === 10 && <TabContainer>Item Eleven</TabContainer>;
  //   }
  //   {
  //     value === 11 && <TabContainer>Item Twelve</TabContainer>;
  //   }
  // };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          {this.state.tabs}
        </Tabs>
        {this.state.tabContainers[this.state.value]}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
