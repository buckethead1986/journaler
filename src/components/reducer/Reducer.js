export default function reducer(
  state = {
    url: "http://localhost:3001/api/v1",
    // users: [],
    // loggedInUser: []
    // tabs: [],
    // tabContainer: {},
    // shownJournalValue: 0
    // textArea: "",
    // textTitle: ""
    defaultColorTheme: {
      hasJournals: "#33cc00",
      noJournals: "#33cc00",
      buttonText: "white",
      buttonBackground: "#3F51B5",
      background: "white",
      headline: "black",
      reachedWordCountGoal: "magenta",
      deleteIconButton: "grey",
      favoriteIconButton: "red",
      statsIconButton: "grey",
      editIconButton: "grey",
      expandIconButton: "grey"
    },
    greyscale: {
      hasJournals: "black",
      noJournals: "grey",
      buttonText: "white",
      buttonBackground: "black",
      background: "grey",
      headline: "black",
      reachedWordCountGoal: "black",
      deleteIconButton: "grey",
      favoriteIconButton: "black",
      statsIconButton: "grey",
      editIconButton: "grey",
      expandIconButton: "grey"
    }
  },
  action
) {
  switch (action.type) {
    // case "SUBMIT_COLOR":
    //   return Object.assign({}, state, { colors: action.payload });
    case "RESET_COLORS":
      return Object.assign({}, state, {
        colors: state.defaultColorTheme
      });
    // case "ADD_TEXT_TITLE":
    //   return Object.assign({}, state, { textTitle: action.payload });
    // case "ADD_TEXT_AREA":
    //   return Object.assign({}, state, { textArea: action.payload });
    // case "CHANGE_SHOWN_JOURNAL_VALUE":
    //   return Object.assign({}, state, { shownJournalValue: action.payload });
    // case "ADD_TABS":
    //   return Object.assign({}, state, { tabs: action.payload });
    // case "ADD_TABS_CONTAINERS":
    //   return Object.assign({}, state, { tabContainer: action.payload });
    // case "ADD_USERS":
    //   return Object.assign({}, state, { users: action.payload });
    default:
      return state;
  }
}
