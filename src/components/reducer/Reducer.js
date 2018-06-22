export default function reducer(
  state = {
    // users: [],
    // loggedInUser: []
  },
  action
) {
  switch (action.type) {
    // case "LOG_IN_USER":
    //   return Object.assign({}, state, { loggedInUser: action.payload });
    // case "ADD_USERS":
    //   return Object.assign({}, state, { users: action.payload });
    default:
      return state;
  }
}
