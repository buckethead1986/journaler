import React from "react";
import JournalPaper from "./JournalPaper";

class NewJournalTabs extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      journals: []
    };
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser,
      journals: this.props.journals
    });
  }

  render() {
    // console.log(this.props.currentUser, this.props.journals);
    return (
      <div>
        <JournalPaper>hey</JournalPaper>
      </div>
    );
  }
}

export default NewJournalTabs;
