export default function reducer(
  state = {
    // users: [],
    // loggedInUser: []
    tabs: [],
    tabContainer: {}
  },
  action
) {
  switch (action.type) {
    case "ADD_TABS":
      return Object.assign({}, state, { tabs: action.payload });
    case "ADD_TABS_CONTAINERS":
      return Object.assign({}, state, { tabContainer: action.payload });
    // case "ADD_USERS":
    //   return Object.assign({}, state, { users: action.payload });
    default:
      return state;
  }
}
