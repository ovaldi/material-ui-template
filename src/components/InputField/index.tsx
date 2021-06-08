import React, { FC } from "react";
import { useUID } from "react-uid";
import { TextField, useTheme } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";

export type InputFieldProps = TextFieldProps;

export const InputField: FC<InputFieldProps> = props => {
  const uid = useUID();
  const theme = useTheme();

  const inputFieldProps: InputFieldProps =
    ({
      outlined: {
        InputLabelProps: {
          shrink: true,
          ...props.InputLabelProps,
          style: {
            transform: "none",
            ...(props.InputLabelProps || {}).style
          }
        },
        InputProps: {
          notched: false,
          ...props.InputProps,
          style: {
            marginTop: theme.spacing(3),
            ...(props.InputProps || {}).style
          }
        },
        inputProps: {
          ...props.inputProps,
          style: {
            height: theme.spacing(1.5),
            ...(props.inputProps || {}).style
          }
        }
      }
    } as {
      [variant: string]: InputFieldProps;
    })[props.variant || "outlined"] || {};

  return <TextField id={uid} {...props} {...(inputFieldProps as any)} />;
};

InputField.defaultProps = {
  margin: "none",
  variant: "outlined"
};

export default InputField;
