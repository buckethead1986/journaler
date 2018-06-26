export default function reducer(
  state = {
    // users: [],
    // loggedInUser: []
    // tabs: [],
    // tabContainer: {},
    shownJournalValue: 0
  },
  action
) {
  switch (action.type) {
    case "CHANGE_SHOWN_JOURNAL_VALUE":
      return Object.assign({}, state, { shownJournalValue: action.payload });
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
