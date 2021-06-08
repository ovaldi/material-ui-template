import React, { FC } from "react";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

interface IProps {
  open: boolean;
  title: string;
  message: string;
  actions: ReadonlyArray<{
    text: string;
    style?: "default" | "primary";
    onPress?: () => any;
  }>;
  onClose: () => void;
}

const useStyles = makeStyles({
  paper: {
    minWidth: 350
  },
  title: {
    textAlign: "center"
  }
});

const Alert: FC<IProps> = props => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      classes={{
        paper: classes.paper
      }}
    >
      <DialogTitle
        classes={{
          root: classes.title
        }}
      >
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.actions.map(it => (
          <Button
            key={it.text}
            color={it.style}
            variant={it.style === "primary" ? "contained" : "text"}
            onClick={() => {
              props.onClose();
              if (it.onPress) {
                it.onPress();
              }
            }}
          >
            {it.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
