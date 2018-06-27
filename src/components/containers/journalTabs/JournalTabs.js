import React from "react";
import JournalPaper from "./JournalPaper";

const JournalTabs = props => {
  console.log(props.tabContainer[props.shownJournalValue]);
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     currentUser: {},
  //     journals: []
  //   };
  // }

  // componentDidMount() {
  //   this.setState({
  //     currentUser: this.props.currentUser,
  //     journals: this.props.journals
  //   });
  // }

  // render() {
  let mappedJournals;
  if ("journal" in props.tabContainer[props.shownJournalValue]) {
    mappedJournals = props.tabContainer[
      props.shownJournalValue
    ].journal.map(journal => {
      return (
        <JournalPaper
          key={journal[0]}
          title={journal[1]}
          content={journal[2]}
          date={journal[3]}
        />
      );
    });
  }

  return <div>{mappedJournals}</div>;
};

export default JournalTabs;
