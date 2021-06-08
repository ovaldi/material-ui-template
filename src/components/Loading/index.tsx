import React, { FC } from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    paddingTop: 100,
    paddingBottom: 100,
    textAlign: "center"
  }
});

const Loading: FC<BoxProps> = props => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
