import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CheckBoxOutline from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";
import JournalPaper from "./journalTabs/JournalPaper";
import { daysInEachMonth, getMonthWord, getFullMonthWord } from "./Helper";
// import { thisIsATest } from "../Helper";
// import Paper from "@material-ui/core/Paper";

let tabs; //array of tab data
let tabContainer; //data displayed for specific tabs
let journalIndex; //location in journals array
let valueCounter; //links tab click to which tabContainer is displayed

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }
//
// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };

const styles = {
  // root: {
  //   flexGrow: 1,
  //   backgroundColor: theme.palette.background.paper
  // },
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
  }
  // typography: {
  //   padding: theme.spacing.unit * 3
  // }
};

export function renderTabsHelper(
  journals,
  store,
  date,
  setTabAndTabContainerState
) {
  // console.log(journals, tabs, tabContainer, valueCounter);
  tabs = [];
  tabContainer = [];
  valueCounter = 29;
  // console.log(journals, tabs, tabContainer, valueCounter);
  // journalIndex = journals.length - 1;
  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  //upon created, add a 'date created attribute' for sorting over. 'yearmonthdayhourminutesecond' just for sorting purposes
  // componentDidMount() {
  //   // journals = this.props.journals;
  //   journalIndex = this.props.journals.length - 1;
  //   tabs = [];
  //   this.setState({ journals: this.props.journals }, () => this.renderTabs());
  //   // this.renderTabs();
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.journals.length, this.props.journals.length);
  //   if (nextProps.journals.length !== this.props.journals.length) {
  //     console.log("here");
  //     journalIndex = this.props.journals.length - 1;
  //     tabs = [];
  //     this.setState(
  //       {
  //         journals: nextProps.journals
  //       },
  //       () => this.doAThing()
  //     );
  //   }
  // }
  //
  // doAThing = () => {
  //   console.log(this.state.journals, this.state.tabContainer);
  //   let journls = this.state.journals;
  //   let tabsContainers = this.state.tabContainer;
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
  //     this.state.tabContainer,
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

  // console.log("doing things", journals, store, date); //State is correct up through here, but by the setState at the end of renderTabs, its old.
  journalIndex = journals.length - 1;
  // let date = new Date();
  // let date = date;
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
  // console.log("before shiftjournalindex", tabs, journalIndex, journals.length);
  //shift journalIndex to chosen startDate. This is code for a stetch goal, currently there isnt a way to shift the tab start date.
  if (journalIndex >= 0) {
    shiftJournalIndex(year, month, date, journals);
  }
  // console.log("before first loop", tabs, journalIndex);
  //adding journal entries for this month from todays date, counting backwards
  for (let i = date.getDate(); i > 0; i--) {
    renderTabsDateCheck(i, year, month, journals);
  }
  // console.log("before second loop", tabs, journalIndex);
  let count = 30 - tabs.length;
  //'tabs' length is all the days of the current month, now adding journal entries in the previous month, up to 30 total
  for (let i = previousMonthLength, j = 0; j < count; i--, j++) {
    renderTabsDateCheck(i, previousYear, previousMonth, journals);
  }
  // console.log(tabs);
  console.log(tabs, tabContainer);
  setTabAndTabContainerState(tabs, tabContainer, tabs.length - 1);
  // store.dispatch({ type: "ADD_TABS", payload: tabs });
  // store.dispatch({ type: "ADD_TABS_CONTAINERS", payload: tabContainer });
  // this.setState(
  //   {
  //     tabs: tabs,
  //     value: tabs.length - 1, //change this to alter the tab you start on.  Currently the first tab shown is todays tab
  //     tabContainer: tabContainer
  //   },
  //   () => console.log("state was updated", this.state.tabContainer[29])
  // );
}

//shifts journalIndex to the final entry for chosen year/month/day
const shiftJournalIndex = (year, month, date, journals) => {
  // console.log(
  //   journals,
  //   journalIndex,
  //   journals[journalIndex]
  // );
  //year
  while (
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[0]) !==
    year
  ) {
    journalIndex--;
  }
  //month
  // console.log(
  //   journals,
  //   journalIndex,
  //   journals[journalIndex]
  // );
  while (
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[1] - 1
    ) !== month
  ) {
    // console.log(
    //   journals,
    //   journalIndex,
    //   journals[journalIndex]
    // );
    journalIndex--;
  }

  //days in the future of chosen date
  while (
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[2]) >
    date.getDate()
  ) {
    journalIndex--;
  }
};

//Check that the journalIndex references a possible index and if the year, month, and day match the current tab iteration.
//If so, adds a colorful tab to tabs, and adds the journal information to tabContainer
const renderTabsDateCheck = (i, year, month, journals) => {
  // console.log("rendercheck", journalIndex);
  // if (journalIndex >= 0) {
  //   console.log(journals, journals[journalIndex], i);
  //   // console.log(
  //   //   "renderTabsDateCheck",
  //   //   parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[2])
  //   // );
  // }
  if (
    journalIndex >= 0 &&
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[2]) ===
      i
  ) {
    // console.log("got here");
    renderJournalTabView(i, month, journals);
  } else {
    renderBlankTabView(i, month);
  }
};

const renderJournalTabView = (i, month, journals) => {
  tabs.unshift(
    <Tab
      key={`${getMonthWord(month)} ${i}`}
      style={styles.tabRoot}
      label={`${getMonthWord(month)} ${i}`}
      icon={<CheckBox style={{ color: "#33cc00" }} />}
    />
  );
  let array = [];
  checkForAdditionalTabContainerData(i, array, month, journals);
};

const checkForAdditionalTabContainerData = (i, array, month, journals) => {
  array.push(
    // <JournalPaper
    //   key={`${monthWord} ${i} journal ${journalIndex}`}
    //   content={journals[journalIndex].content}
    //   title={journals[journalIndex].title}
    // >
    //   {journals[journalIndex].content}
    // </JournalPaper>
    [
      journals[journalIndex].id,
      journals[journalIndex].title,
      journals[journalIndex].content
    ]
  );
  journalIndex--;

  if (
    journalIndex >= 0 &&
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[2]) ===
      i
  ) {
    checkForAdditionalTabContainerData(i, array, month, journals);
  } else {
    tabContainer[valueCounter] = {};
    // <TabContainer key={`${monthWord} ${i} container`}>{array}</TabContainer>
    tabContainer[valueCounter]["journal"] = array;
    // array;
    tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;
    valueCounter--;
  }
};

const renderBlankTabView = (i, month) => {
  tabs.unshift(
    <Tab
      key={`${getMonthWord(month)} ${i}`}
      style={styles.tabRoot}
      label={`${getMonthWord(month)} ${i}`}
      icon={<CheckBoxOutline style={{ color: "#33cc00" }} />}
    />
  );
  tabContainer[valueCounter] = {};
  // tabContainer[valueCounter]["journal"] = [
  //   journals[journalIndex].id,
  //   journals[journalIndex].title,
  //   journals[journalIndex].content
  // ];
  tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;
  // <TabContainer key={`${monthWord} ${i} container`}>
  // [];
  // tabContainer[valueCounter]["date"] = `${monthWord} ${i}`;
  // </TabContainer>
  valueCounter--;
};

// render() {
//   console.log(this.props.journals);
//   const { classes } = this.props;
//   const { value } = this.state;
//
//   return (
//     <div>
//       <Tabs
//         value={value}
//         onChange={this.handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//         scrollable
//         scrollButtons="auto"
//         classes={{
//           root: classes.tabsRoot,
//           indicator: classes.tabsIndicator
//         }}
//       >
//         {this.state.tabs}
//       </Tabs>
//       {this.state.tabContainer[this.state.value]}
//     </div>
//   );
// }
//
// ScrollableTabsButtonAuto.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ScrollableTabsButtonAuto);
