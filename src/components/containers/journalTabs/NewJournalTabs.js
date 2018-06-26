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
    let mappedJournals = this.props.tabContainer[
      this.props.shownJournalValue
    ].map(journal => {
      console.log(journal);
      return (
        <JournalPaper
          key={journal[0]}
          title={journal[1]}
          content={journal[2]}
        />
      );
    });

    console.log(
      this.props.tabContainer[this.props.shownJournalValue],
      mappedJournals
    );
    return <div>{mappedJournals}</div>;
  }
}

export default NewJournalTabs;
