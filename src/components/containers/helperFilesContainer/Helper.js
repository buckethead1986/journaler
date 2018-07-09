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
      //leap years through 2028
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
      break;
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
//checks that the color input is a valid hex code, rgb, or normal color word.  If not, resets to previous color.
export function checkColorCodes(colorsObject, colors) {
  let checkedColorCodes = Object.assign({}, colorsObject);

  for (let item in colorsObject) {
    if (item !== "wordCountGoal" && item !== "useDummyData") {
      let isValidColorCode = false;
      if (colorsObject[item][0] === "#") {
        let isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(
          colorsObject[item]
        ); //hex check
        if (isOk) {
          isValidColorCode = true;
        }
      } else if (colorsObject[item].slice(0, 3).toLowerCase() === "rgb") {
        //rgb check
        if (checkRgb(colorsObject[item])) {
          isValidColorCode = true;
        }
      } else {
        switch (colorsObject[item].toLowerCase()) { //normal color words check
          case "red":
          case "orange":
          case "yellow":
          case "green":
          case "blue":
          case "purple":
          case "black":
          case "brown":
          case "gold":
          case "grey":
          case "gray":
          case "indigo":
          case "maroon":
          case "magenta":
          case "navy":
          case "pink":
          case "silver":
          case "violet":
          case "white":
            isValidColorCode = true;
            break;
          default:
            isValidColorCode = false;
            break;
        }
      }
      if (!isValidColorCode) {
        checkedColorCodes[item] = colors[item];
      }
    }
  }
  return checkedColorCodes;
}

function checkRgb(rgb) {
  var rxValidRgb = /([R][G][B][A]?[(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9]{1})|(1\.0)|(1)))?[)])/i;
  if (rxValidRgb.test(rgb)) {
    return true;
  }
}

//Theres a bug with javascript date objects coming from rails/mongo databases, calling 'getMonth or .getDate on the .created_at attribute returns undefined.
//Theres a workaround, but it requires jQuery and moment. For this one date parsing, this is simnpler.
export function returnParsedDate(journals, journalId) {
  let date;
  let month;
  let journal = journals.filter(journal => journal.id === journalId)[0];
  if (journal) {
    let journalCreation = journal.created_at.split("T")[0].split("-");
    month = getFullMonthWord(parseInt(journalCreation[1].slice(1) - 1, 10));
    date = removeZeroFromBeginning(journalCreation[2]);
    return ` from ${month} ${date}`;
  } else {
    return "";
  }
}

//aesthetic, turns 01 into 1 for 'July 1'
function removeZeroFromBeginning(item) {
  if (item[0] === "0") {
    item = item.slice(1);
  }
  return item;
}

//seeds journals with dummy lorem ipsum data if 'add pre-made journals' checkbox was checked on signup.
export function seedJournals(journals) {
  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  for (let i = date.getDate(); i > 0; i -= 3) {
    journals.unshift({
      id: `a${i}`,
      content: toggleLongJournal(i),
      title: "Lorem",
      lorem: true,
      created_at: `${year}-${month}-${i}T12:25:25.597-04:00`
    });
  }
  for (let i = 30; i > date.getDate(); i -= 3) {
    if (month === 1) {
      year = date.getFullYear() - 1;
      month = 12;
    }

    journals.unshift({
      id: `b${i}`,
      content: toggleLongJournal(i),
      title: "Lorem",
      lorem: true,
      created_at: `${year}-${month}-${i}T12:25:25.597-04:00`
    });
  }
  return journals;
}

function toggleLongJournal(i) {
  if (i % 2 === 0) {
    return "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
  } else {
    return "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
  }
}
