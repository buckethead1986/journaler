import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import JournalTabs from "./JournalTabs";
import NewJournalTabs from "./NewJournalTabs";
import JournalTextArea from "../journal/JournalTextArea";

class TabCreator extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col>
            <NewJournalTabs
              url={this.props.url}
              date={this.props.date}
              store={this.props.store}
              currentUser={this.props.currentUser}
              journals={this.props.journals}
            />
          </Col>
          <Col>
            <JournalTextArea url={this.props.url} store={this.props.store} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TabCreator;
