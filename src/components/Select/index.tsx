import React, { FC } from "react";
import { SelectProps } from "@material-ui/core/Select";
import { makeStyles, Select, InputLabel, FormControl } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  select: {
    height: theme.spacing(1.5)
  },
  control: {
    paddingTop: theme.spacing(3)
  }
}));

interface IProps extends SelectProps {
  label: string;
}

const Wrapper: FC<IProps> = ({ error, label, children, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl
      fullWidth
      error={error}
      variant="outlined"
      classes={{
        root: classes.control
      }}
    >
      <InputLabel
        style={{
          transform: "none"
        }}
      >
        {label}
      </InputLabel>
      <Select
        fullWidth
        classes={{
          root: classes.select
        }}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default Wrapper;
