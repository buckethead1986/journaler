import React from "react";

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
    console.log(this.props.currentUser, this.props.journals);
    return (
      <div>
        <div>hey</div>
      </div>
    );
  }
}

export default NewJournalTabs;
