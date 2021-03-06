import React from "react";
import JournalPaper from "./JournalPaper";

const JournalTabs = props => {
  let mappedJournals = props.tabContainer[
    props.shownJournalValue
  ].journal.map(journal => {
    return (
      <JournalPaper
        key={journal[0]}
        id={journal[0]}
        title={journal[1]}
        content={journal[2]}
        lorem={journal[3]}
        colors={props.colors}
        deleteJournal={props.deleteJournal}
        shownJournalValue={props.shownJournalValue}
        journalEditOrStatsLink={props.journalEditOrStatsLink}
      />
    );
  });

  return <div>{mappedJournals}</div>;
};

export default JournalTabs;
