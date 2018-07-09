import React from "react";
import Tab from "@material-ui/core/Tab";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Favorite from "@material-ui/icons/Favorite";
import {
  seedJournals,
  daysInEachMonth,
  getMonthWord,
  getFullMonthWord
} from "./Helper";

let tabs;
let tabContainer;
let journalIndex;
let valueCounter;

const styles = {
  tabRoot: {
    textTransform: "initial",
    minWidth: 50,
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
    ].join(",")
  }
};

//renderTabsHelper accepts data and updates state with 'tabs' and 'tabContainer'. tabs is the container for the scrollable tab
//component in the appbar, and renders the past 30 days from whatever start date is picked (altering the icon based on if content was
//written that day, and if the total words written that day exceeds the word count goal.
//tabContainer is a corresponding array of all journal data from those 30 days.
export function renderTabsHelper(
  journals,
  date,
  setTabAndTabContainerState,
  colors
) {
  tabs = [];
  tabContainer = [];
  valueCounter = 29;
  if (colors.useDummyData) {
    journals = seedJournals(journals);
  }
  journalIndex = journals.length - 1;
  let year = date.getFullYear();
  let month = date.getMonth();
  let previousMonth = month - 1;
  let previousMonthLength = daysInEachMonth(date.getMonth() - 1, year);

  //For January to December transition
  if (month === 0) {
    previousMonth = 11;
    previousMonthLength = 31;
  }

  shiftJournalIndexBasedOnTabStartDate(year, month, date, journals);

  for (let i = date.getDate(); i > 0; i--) {
    checkDateAndRenderJournalOrBlankTab(i, month, journals, colors);
  }

  let count = 30 - tabs.length; //to keep 'tabs' length at 30, regardless of start date
  for (let i = previousMonthLength, j = 0; j < count; i--, j++) {
    checkDateAndRenderJournalOrBlankTab(i, previousMonth, journals, colors);
  }
  setTabAndTabContainerState(tabs, tabContainer, tabs.length - 1);
}

//shifts through journals by year, month, and then if the latest journal was written in
const shiftJournalIndexBasedOnTabStartDate = (year, month, date, journals) => {
  shiftJournalIndexByCreatedAtDate("year", year, 0, journals);
  shiftJournalIndexByCreatedAtDate("month", month + 1, 1, journals);
  if (
    journals[journalIndex] &&
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[1],
      10
    ) ===
      month + 1
  ) {
    shiftJournalIndexByCreatedAtDate("date", date.getDate(), 2, journals);
  }
};

//template for shifting by year, month, or day
//recursive, if journalIndex still returns a valid result, moves to the previous journal and checks the date.
const shiftJournalIndexByCreatedAtDate = (
  type,
  comparisonValue,
  createdAtSplitValue,
  journals
) => {
  if (
    journals[journalIndex] &&
    parseInt(
      journals[journalIndex].created_at.split("T")[0].split("-")[
        createdAtSplitValue
      ],
      10
    ) > comparisonValue
  ) {
    journalIndex--;
    if (journals[journalIndex]) {
      shiftJournalIndexByCreatedAtDate(
        type,
        comparisonValue,
        createdAtSplitValue,
        journals
      );
    }
  }
};

const checkDateAndRenderJournalOrBlankTab = (i, month, journals, colors) => {
  journals[journalIndex] &&
  parseInt(
    journals[journalIndex].created_at.split("T")[0].split("-")[2],
    10
  ) === i
    ? renderJournalTabView(i, month, journals, colors)
    : renderBlankTabView(i, month, colors);
};

//if journals exist on this day, creates an array, pushes all journals from today onto it, and sets it to tabContainer[valueCounter]['journal']
const renderJournalTabView = (i, month, journals, colors) => {
  let array = [];
  checkForAdditionalTabContainerData(i, array, month, journals, colors);
};

//No journals for this day, no 'journal' key gets created for tabContainer[valueCounter]
const renderBlankTabView = (i, month, colors) => {
  addTabtoTabs(i, month, colors, RadioButtonUnchecked);
  tabContainer[valueCounter] = {};
  tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;
  valueCounter--;
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
    journals[journalIndex].content,
    journals[journalIndex].lorem
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
    addTabtoTabs(i, month, colors, IconTagName);
    tabContainer[valueCounter] = {};
    tabContainer[valueCounter]["journal"] = array;
    tabContainer[valueCounter]["date"] = `${getFullMonthWord(month)} ${i}`;
    valueCounter--;
  }
};

const addTabtoTabs = (i, month, colors, IconTagName) => {
  tabs.unshift(
    <Tab
      key={`${getMonthWord(month)} ${i}`}
      style={styles.tabRoot}
      label={`${getMonthWord(month)} ${i}`}
      icon={<IconTagName style={{ color: colors.tabColor }} />}
    />
  );
};
