import React from "react";
import Tab from "@material-ui/core/Tab";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Favorite from "@material-ui/icons/Favorite";
import { daysInEachMonth, getMonthWord, getFullMonthWord } from "./Helper";

let tabs;
let tabContainer;
let journalIndex;
let valueCounter;

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
  // tabsRoot: {
  //   // borderTop: "1px solid #e8e8e8",
  //   borderBottom: "1px solid #e8e8e8"
  // },
  tabsIndicator: {
    // backgroundColor: "#1890ff"
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
    // "&:hover": {
    //   color: "#40a9ff",
    //   opacity: 1
    // },
    "&$tabSelected": {
      // color: "#1890ff"
      // fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      // color: "#40a9ff"
    }
  }
};

//renderTabsHelper accepts data and updates state with 'tabs' and 'tabContainer'. tabs is the container for the
//scrollable tab component in the appbar, and renders the past 30 days from whatever start date is picked (altering the icon based on content written on each day).
//tabContainer is a corresponding array of all journal data from those 30 days.
export function renderTabsHelper(
  journals,
  store,
  date,
  setTabAndTabContainerState,
  colors
) {
  tabs = [];
  tabContainer = [];
  valueCounter = 29;
  journalIndex = journals.length - 1;

  let year = date.getFullYear();
  let month = date.getMonth();
  let previousYear = year;
  let previousMonth = month - 1;
  let previousMonthLength = daysInEachMonth(
    date.getMonth() - 1,
    date.getFullYear()
  );
  //For January to December transition
  if (month === 0) {
    previousYear--;
    previousMonth = 11;
    previousMonthLength = 31;
  }
  // let newDate = new Date();
  // console.log(newDate.getMonth());
  // newDate.setMonth(2);
  // console.log(newDate.getMonth());
  // date.setMonth(5);
  // console.log(journals, month, date);
  //
  // //test data
  // year = 2018;
  // month = 5;
  // previousYear = 2017;
  // previousMonth = 4;
  // previousMonthLength = 31;

  //shift journalIndex to chosen startDate. This is code for a stetch goal, currently there isnt a way to shift the tab start date.
  if (journalIndex >= 0) {
    shiftJournalIndex(year, month, date, journals);
  }

  //adding journal entries for this month from todays date, counting backwards
  for (let i = date.getDate(); i > 0; i--) {
    renderTabsDateCheck(i, year, month, journals, colors);
  }
  let count = 30 - tabs.length;
  //'tabs' length is all the days of the current month, now adding journal entries in the previous month, up to 30 total
  for (let i = previousMonthLength, j = 0; j < count; i--, j++) {
    renderTabsDateCheck(i, previousYear, previousMonth, journals, colors);
  }
  setTabAndTabContainerState(tabs, tabContainer, tabs.length - 1);
}

//shifts journalIndex to the final entry for chosen year/month/day
const shiftJournalIndex = (year, month, date, journals) => {
  //year
  while (
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[0],
      10
    ) !== year &&
    journalIndex > 0
  ) {
    journalIndex--;
  }
  //month
  while (
    //This breaks if all journals are in months previous to the one. This works if the month is july, and its counting down from dec, but not dec => july
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[1] - 1,
      10
    ) !== month &&
    journalIndex > 0
  ) {
    journalIndex--;
  }
  //days in the future of chosen date
  while (
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[2],
      10
    ) > date.getDate() &&
    journalIndex > 0
  ) {
    journalIndex--;
  }
};

//Check that the journalIndex references a possible index and if the year, month, and day match the current tab iteration.
//If so, adds a colorful tab to tabs, and adds the journal information to tabContainer
const renderTabsDateCheck = (i, year, month, journals, colors) => {
  if (
    journalIndex >= 0 &&
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[2],
      10
    ) === i
  ) {
    renderJournalTabView(i, month, journals, colors);
  } else {
    renderBlankTabView(i, month, colors);
  }
};

const renderJournalTabView = (i, month, journals, colors) => {
  let array = [];
  checkForAdditionalTabContainerData(i, array, month, journals, colors);
};

//constructs an array of all journals for a given day, then assigns it to tabContainer[valueCounter]["journal"]. If there are no journals for a day,
//the 'journal' key never gets created. That key is used in a conditional in 'journalTabs/TabCreator'
const checkForAdditionalTabContainerData = (
  i,
  array,
  month,
  journals,
  colors
) => {
  array.push([
    journals[journalIndex].id,
    journals[journalIndex].title,
    journals[journalIndex].content
  ]);
  journalIndex--;

  if (
    journalIndex >= 0 &&
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[2],
      10
    ) === i
  ) {
    checkForAdditionalTabContainerData(i, array, month, journals, colors);
  } else {
    let count = 0;
    let IconTagName = CheckCircle;
    for (let journal of array) {
      let words = journal[2].split(" ").length;
      count += words;
      if (count >= colors.wordCountGoal) {
        IconTagName = Favorite;
      }
    }
    tabs.unshift(
      <Tab
        key={`${getMonthWord(month)} ${i}`}
        style={styles.tabRoot}
        label={`${getMonthWord(month)} ${i}`}
        icon={<IconTagName style={{ color: colors.tabColor }} />}
      />
    );
    tabContainer[valueCounter] = {};
    tabContainer[valueCounter]["journal"] = array;
    tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;
    valueCounter--;
  }
};

//No journals for this day, no 'journal' key gets created for tabContainer[valueCounter]
const renderBlankTabView = (i, month, colors) => {
  tabs.unshift(
    <Tab
      key={`${getMonthWord(month)} ${i}`}
      style={styles.tabRoot}
      label={`${getMonthWord(month)} ${i}`}
      icon={<RadioButtonUnchecked style={{ color: colors.tabColor }} />}
    />
  );
  tabContainer[valueCounter] = {};
  tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;

  valueCounter--;
};
