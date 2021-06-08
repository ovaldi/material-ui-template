import React, { FC } from "react";
import {
  DatePicker,
  DatePickerProps,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Icon, IconButton, InputAdornment } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import InputField from "components/InputField";

const Wrapper: FC<DatePickerProps> = ({ onChange, ...rest }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        variant="inline"
        format="MMM d, yyyy"
        minDate="1600-01-01"
        placeholder="Select Date"
        TextFieldComponent={InputField}
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
