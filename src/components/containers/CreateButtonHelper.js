import React from "react";
import Button from "@material-ui/core/Button";

export function renderButton(text, callbackFunction, classes, colors) {
  return (
    <Button
      variant="contained"
      style={{
        color: colors.buttonText || "default",
        backgroundColor: colors.buttonBackground || "default"
      }}
      className={classes.loginButton}
      onClick={() => callbackFunction()}
      disableRipple={true}
      disableFocusRipple={true}
    >
      {text}
    </Button>
  );
}
