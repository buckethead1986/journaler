export default function reducer(
  state = {
    url: "https://journaler-api.herokuapp.com/api/v1",
    date: "",
    defaultSettings: {
      tabColor: "#33cc00",
      buttonText: "white",
      buttonColor: "#3F51B5",
      background: "#DCDCDC",
      wordCountGoal: 750,
      useDummyData: false
    }
  },
  action
) {
  switch (action.type) {
    case "RESET_COLORS":
      return Object.assign({}, state, {
        colors: state.defaultSettings
      });
    case "SET_DATE":
      return Object.assign({}, state, { date: action.payload });
    default:
      return state;
  }
}
