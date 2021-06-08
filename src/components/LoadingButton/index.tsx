import React, { FC } from "react";
import { ButtonProps } from "@material-ui/core/Button";
import { Button, makeStyles, CircularProgress } from "@material-ui/core";

interface IProps extends ButtonProps {
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  button: {
    position: "relative"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const LoadingButton: FC<IProps> = ({
  loading,
  children,
  disabled,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Button
      disabled={disabled || loading}
      classes={{
        root: classes.button
      }}
      {...rest}
    >
      {children}
      {loading && (
        <CircularProgress size={24} classes={{ root: classes.progress }} />
      )}
    </Button>
  );
};

export default LoadingButton;
