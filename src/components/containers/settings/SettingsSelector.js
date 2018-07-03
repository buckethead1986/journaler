import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,

    align: "center"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SimpleSelect extends React.Component {
  state = {
    presets: ""
  };

  handleChange = event => {
    let result;
    switch (event.target.value) {
      case "default":
        result = this.props.store.getState().defaultColorTheme;
        break;
      case "greyscale":
        result = this.props.store.getState().greyscale;
        break;
      default:
        result = this.props.colors;
        break;
    }
    this.setState({ [event.target.name]: event.target.value }, () =>
      this.props.handleSelectorChange(result)
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid align="center">
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="preset-themes">Preset Themes</InputLabel>
            <Select
              value={this.state.presets}
              onChange={this.handleChange}
              style={{ width: "200px" }}
              input={<Input name="presets" id="preset-themes" />}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"default"}>Default</MenuItem>
              <MenuItem value={"greyscale"}>GreyScale</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
