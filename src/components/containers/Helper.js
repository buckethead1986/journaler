export function getMonthWord(month) {
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
}

export function getFullMonthWord(month) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "";
  }
}

export function daysInEachMonth(month, year) {
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
}
