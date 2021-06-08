import React, { FC } from "react";
import { BoxProps } from "@material-ui/core/Box";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    paddingTop: 100,
    paddingBottom: 100,
    textAlign: "center"
  },
  icon: {
    width: 110,
    height: 110,
    fill: "currentColor"
  }
});

const Nothing: FC<BoxProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...rest}>
      <Typography variant="h5" color="textPrimary" component="div">
        Uh oh{" "}
        <span role="img" aria-label="nothing">
          😬
        </span>
      </Typography>
      <Typography variant="subtitle1" color="textPrimary" component="div">
        {children}
      </Typography>
    </Box>
  );
};

export default Nothing;
