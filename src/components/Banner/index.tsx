import React, { FC } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  banner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 88,
    backgroundColor: theme.palette.primary.main,
    zIndex: -1
  }
}));

const Banner: FC<{
  height?: number;
}> = ({ height = 250 }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.banner}
      style={{
        height
      }}
    />
  );
};

export default Banner;
