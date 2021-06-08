import React, { FC } from "react";
import {
  TimePicker,
  TimePickerProps,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Icon, IconButton, InputAdornment } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import InputField from "components/InputField";

const Wrapper: FC<TimePickerProps> = ({ onChange, ...rest }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        TextFieldComponent={InputField}
        variant="inline"
        format="hh:mm a"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={date => {
          if (date && isNaN(date.getTime())) {
            onChange(null);
          } else {
            onChange(date);
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size={"small"}
                onClick={event => {
                  onChange(null);
                  event.stopPropagation();
                }}
              >
                <Icon color="action">clear</Icon>
              </IconButton>
            </InputAdornment>
          )
        }}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Wrapper;
