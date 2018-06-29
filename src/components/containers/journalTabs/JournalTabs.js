import React from "react";
import JournalPaper from "./JournalPaper";

const JournalTabs = props => {
  let mappedJournals = props.tabContainer[
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

  return <div>{mappedJournals}</div>;
};

export default JournalTabs;
