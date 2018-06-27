import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CheckBoxOutline from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";
import JournalPaper from "./JournalPaper";
import { daysInEachMonth, getMonthWord } from "../Helper";
// import { thisIsATest } from "../Helper";
// import Paper from "@material-ui/core/Paper";

let tabs = []; //array of tab data
let tabContainers = {}; //data displayed for specific tabs
let journalIndex; //location in journals array
let valueCounter = 29; //links tab click to which tabContainer is displayed

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
    // borderTop: "1px solid #e8e8e8",
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
    minWidth: 50,
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
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
    tabs: [],
    journals: [],
    tabContainers: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  //upon created, add a 'date created attribute' for sorting over. 'yearmonthdayhourminutesecond' just for sorting purposes
  componentDidMount() {
    // journals = this.props.journals;
    journalIndex = this.props.journals.length - 1;
    tabs = [];
    this.setState({ journals: this.props.journals }, () => this.renderTabs());
    // this.renderTabs();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.journals.length, this.props.journals.length);
    if (nextProps.journals.length !== this.props.journals.length) {
      // console.log("here");
      journalIndex = this.props.journals.length - 1;
      tabs = [];
      this.setState(
        {
          journals: nextProps.journals
        }
        // () => this.doAThing()
      );
    }
  }

  // doAThing = () => {
  //   // console.log(this.state.journals, this.state.tabContainers);
  //   let journls = this.state.journals;
  //   let tabsContainers = this.state.tabContainers;
  //   // debugger;
  // };

  // componentWillReceiveProps(nextProps) {
  //   console.log(
  //     this.props.journals,
  //     nextProps.journals,
  //     this.state.journals,
  //     this.props.journals.length - 1,
  //     journalIndex,
  //     this.state.tabs,
  //     this.state.tabContainers,
  //     valueCounter
  //   );
  //   if (nextProps.currentUser !== this.props.currentUser) {
  //     // journals = nextProps.journals;
  //     journalIndex = nextProps.journals.length - 1;
  //     valueCounter = 29;
  //     this.setState(
  //       {
  //         tabs: [],
  //         tabContainer: {},
  //         journals: nextProps.journals
  //       },
  //       () => this.renderTabs()
  //     );
  //   }
  // }

  renderTabs = () => {
    console.log("doing things", this.props.journals); //State is correct up through here, but by the setState at the end of renderTabs, its old.
    journalIndex = this.props.journals.length - 1;
    // let date = new Date();
    let date = this.props.date;
    let year = date.getFullYear();
    let month = date.getMonth();
    let monthWord = getMonthWord(month);
    let previousYear = year;
    let previousMonth = month - 1;
    let previousMonthWord = getMonthWord(previousMonth);
    let previousMonthLength = daysInEachMonth(
      date.getMonth() - 1,
      date.getFullYear()
    );
    //For January to December transition
    if (month === 0) {
      previousYear--;
      previousMonth = 11;
      previousMonthWord = "Dec";
      previousMonthLength = 31;
    }

    // //test data
    // year = 2018;
    // month = 0;
    // previousYear = 2017;
    // previousMonth = 11;
    // monthWord = "THING";
    // previousMonthWord = "bacon";
    // previousMonthLength = 31;

    //shift journalIndex to chosen startDate. This is code for a stetch goal, currently there isnt a way to shift the tab start date.
    if (journalIndex >= 0) {
      this.shiftJournalIndex(year, month, date);
    }
    //adding journal entries for this month from todays date, counting backwards
    for (let i = date.getDate(); i > 0; i--) {
      this.renderTabsDateCheck(i, year, month, monthWord);
    }
    let count = 30 - tabs.length;
    //'tabs' length is all the days of the current month, now adding journal entries in the previous month, up to 30 total
    for (let i = previousMonthLength, j = 0; j < count; i--, j++) {
      this.renderTabsDateCheck(
        i,
        previousYear,
        previousMonth,
        previousMonthWord
      );
    }
    this.setState(
      {
        tabs: tabs,
        value: tabs.length - 1, //change this to alter the tab you start on.  Currently the first tab shown is todays tab
        tabContainers: tabContainers
      },
      () => console.log("state was updated", this.state.tabContainers[29])
    );
  };
  //shifts journalIndex to the final entry for chosen year/month/day
  shiftJournalIndex = (year, month, date) => {
    console.log(
      this.state.journals,
      journalIndex,
      this.state.journals[journalIndex]
    );
    //year
    while (
      parseInt(
        this.state.journals[journalIndex].created_at.split("T")[0].split("-")[0]
      ) !== year
    ) {
      journalIndex--;
    }
    //month
    console.log(
      this.state.journals,
      journalIndex,
      this.state.journals[journalIndex]
    );
    while (
      parseInt(
        this.state.journals[journalIndex].created_at
          .split("T")[0]
          .split("-")[1] - 1
      ) !== month
    ) {
      console.log(
        this.state.journals,
        journalIndex,
        this.state.journals[journalIndex]
      );
      journalIndex--;
    }

    //days in the future of chosen date
    while (
      parseInt(
        this.state.journals[journalIndex].created_at.split("T")[0].split("-")[2]
      ) > date.getDate()
    ) {
      journalIndex--;
    }
  };

  //Check that the journalIndex references a possible index and if the year, month, and day match the current tab iteration.
  //If so, adds a colorful tab to tabs, and adds the journal information to tabContainers
  renderTabsDateCheck = (i, year, month, monthWord) => {
    if (
      journalIndex >= 0 &&
      parseInt(
        this.state.journals[journalIndex].created_at.split("T")[0].split("-")[2]
      ) === i
    ) {
      this.renderJournalTabView(i, monthWord);
    } else {
      this.renderBlankTabView(i, monthWord);
    }
  };

  renderJournalTabView = (i, monthWord) => {
    tabs.unshift(
      <Tab
        key={`${monthWord} ${i}`}
        className={this.props.classes.tabRoot}
        label={`${monthWord} ${i}`}
        icon={<CheckBox style={{ color: "#33cc00" }} />}
      />
    );
    let array = [];
    this.checkForAdditionalTabContainerData(i, array, monthWord);
  };

  checkForAdditionalTabContainerData = (i, array, monthWord) => {
    array.push(
      <JournalPaper
        key={`${monthWord} ${i} journal ${journalIndex}`}
        content={this.state.journals[journalIndex].content}
        title={this.state.journals[journalIndex].title}
      >
        {this.state.journals[journalIndex].content}
      </JournalPaper>
    );
    journalIndex--;

    if (
      journalIndex >= 0 &&
      parseInt(
        this.state.journals[journalIndex].created_at.split("T")[0].split("-")[2]
      ) === i
    ) {
      this.checkForAdditionalTabContainerData(i, array, monthWord);
    } else {
      tabContainers[valueCounter] = (
        <TabContainer key={`${monthWord} ${i} container`}>{array}</TabContainer>
      );
      valueCounter--;
    }
  };

  renderBlankTabView = (i, monthWord) => {
    tabs.unshift(
      <Tab
        key={`${monthWord} ${i}`}
        className={this.props.classes.tabRoot}
        label={`${monthWord} ${i}`}
        icon={<CheckBoxOutline style={{ color: "#33cc00" }} />}
      />
    );
    tabContainers[valueCounter] = (
      <TabContainer key={`${monthWord} ${i} container`}>
        No Journal Today
      </TabContainer>
    );
    valueCounter--;
  };

  render() {
    console.log(this.props.journals);
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
