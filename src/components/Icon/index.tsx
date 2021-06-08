import React, { FC } from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  default: {
    fill: "currentColor",
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(3)
  }
}));

interface IProps {
  className?: string;
}

const Icon: FC<IProps> = ({ children, className = "" }) => {
  const classes = useStyles();

  return (
    <svg className={classnames(classes.default, className)}>
      <use xlinkHref={`#icon-${children}`}></use>
    </svg>
  );
};

export default Icon;
