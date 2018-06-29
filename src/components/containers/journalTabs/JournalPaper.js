import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit
  })
});

class PaperSheet extends React.Component {
  state = {
    fullSize: false
  };

  toggleSize = () => {
    this.setState(prevState => {
      return { fullSize: !prevState.fullSize };
    });
  };

  render() {
    const { classes } = this.props;
    return this.props.content.length > 300 && !this.state.fullSize ? (
      <div>
        <Paper
          className={classes.root}
          elevation={2}
          onClick={() => this.toggleSize()}
        >
          <Typography variant="headline" component="h3">
            {this.props.title}
          </Typography>
          <Typography component="h3">
            {this.props.content.slice(0, 300) + "\n ..."}
          </Typography>
        </Paper>
      </div>
    ) : (
      <div>
        <Paper
          className={classes.root}
          elevation={2}
          onClick={() => this.toggleSize()}
        >
          <Typography variant="headline" component="h3">
            {this.props.title}
          </Typography>
          <Typography component="h3">{this.props.content}</Typography>
        </Paper>
      </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
