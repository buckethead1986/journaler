let tabs = []; //array of tab data
let tabContainers = {}; //data displayed for specific tabs
// let journals; //array of this users' journals
let journalIndex; //location in journals array
let valueCounter = 29; //links tab click to which tabContainer is displayed

export function renderTabs(classes, journals) {
  // renderTabs = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let monthWord = this.getMonthWord(month);
  let previousYear = year;
  let previousMonth = month - 1;
  let previousMonthWord = this.getMonthWord(previousMonth);
  let previousMonthLength = this.daysInEachMonth(
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
    this.shiftJournalIndex(year, month);
  }
  //adding journal entries for this month from todays date, counting backwards
  for (let i = date.getDate(); i > 0; i--) {
    this.renderTabsDateCheck(i, year, month, monthWord);
  }
  let count = 30 - tabs.length;
  //'tabs' length is all the days of the current month, now adding journal entries in the previous month, up to 30 total
  for (let i = previousMonthLength, j = 0; j < count; i--, j++) {
    this.renderTabsDateCheck(i, previousYear, previousMonth, previousMonthWord);
  }
  this.setState({
    tabs: tabs,
    value: tabs.length - 1, //change this to alter the tab you start on.  Currently the first tab shown is todays tab
    tabContainers: tabContainers
  });

  shiftJournalIndex = (year, month) => {
    //shifts the journalIndex to the final entry for the chosen year
    console.log(journals, journalIndex, journals[journalIndex]);
    while (
      parseInt(
        journals[journalIndex].created_at.split("T")[0].split("-")[0]
      ) !== year
    ) {
      journalIndex--;
    }
    //shifts the journalIndex to the final entry for the chosen month
    while (
      parseInt(
        journals[journalIndex].created_at.split("T")[0].split("-")[1] - 1
      ) !== month
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
        journals[journalIndex].created_at.split("T")[0].split("-")[2]
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
        className={classes.tabRoot}
        label={`${monthWord} ${i}`}
        icon={<CheckBox style={{ color: "#33cc00" }} />}
      />
    );
    let array = [];
    this.checkForAdditionalTabContainerData(i, array, monthWord);
  };

  checkForAdditionalTabContainerData = (i, array, monthWord) => {
    array.push(
      <JournalPaper key={`${monthWord} ${i} journal ${journalIndex}`}>
        {journals[journalIndex].content}
      </JournalPaper>
    );
    journalIndex--;

    if (
      journalIndex >= 0 &&
      parseInt(
        journals[journalIndex].created_at.split("T")[0].split("-")[2]
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
        className={classes.tabRoot}
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

  getMonthWord = month => {
    switch (month) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "";
    }
  };

  daysInEachMonth = (month, year) => {
    // console.log(month);
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
}

export function thisIsATest(classes, journals) {
  thing("item");
  return journals;
}
const thing = item => {
  console.log("do a", item);
};
