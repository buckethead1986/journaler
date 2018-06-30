import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CheckBoxOutline from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";
import JournalPaper from "./journalTabs/JournalPaper";
import { daysInEachMonth, getMonthWord, getFullMonthWord } from "./Helper";

let tabs; //array of tab data
let tabContainer; //data displayed for specific tabs
let journalIndex; //location in journals array
let valueCounter; //links tab click to which tabContainer is displayed

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
  tabs = [];
  tabContainer = [];
  valueCounter = 29;

  //upon created, add a 'date created attribute' for sorting over. 'yearmonthdayhourminutesecond' just for sorting purposes
  // componentDidMount() {
  //   // journals = this.props.journals;
  //   journalIndex = this.props.journals.length - 1;
  //   tabs = [];
  //   this.setState({ journals: this.props.journals }, () => this.renderTabs());
  //   // this.renderTabs();
  // }

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
  setTabAndTabContainerState(tabs, tabContainer, tabs.length - 1);
}

//shifts journalIndex to the final entry for chosen year/month/day
const shiftJournalIndex = (year, month, date, journals) => {
  //year
  while (
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[0]) !==
    year
  ) {
    journalIndex--;
  }
  //month

  while (
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[1] - 1
    ) !== month
  ) {
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
  if (
    journalIndex >= 0 &&
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[2]) ===
      i
  ) {
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

//constructs an array of all journals for a given day, then assigns it to tabContainer[valueCounter]["journal"]. If there are no journals for a day,
//the 'journal' key never gets created. That key is used in a conditional in 'journalTabs/TabCreator'
const checkForAdditionalTabContainerData = (i, array, month, journals) => {
  array.push([
    journals[journalIndex].id,
    journals[journalIndex].title,
    journals[journalIndex].content
  ]);
  journalIndex--;

  if (
    journalIndex >= 0 &&
    parseInt(journals[journalIndex].created_at.split("T")[0].split("-")[2]) ===
      i
  ) {
    checkForAdditionalTabContainerData(i, array, month, journals);
  } else {
    tabContainer[valueCounter] = {};
    tabContainer[valueCounter]["journal"] = array;
    tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;
    valueCounter--;
  }
};

//No journals for this day, no 'journal' key gets created for tabContainer[valueCounter]
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

  tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;

  valueCounter--;
};
