import React, { FC } from "react";
import { Icon, useTheme } from "@material-ui/core";
import Select, { Props as SelectProps } from "react-select";

const DropdownIndicator: FC<any> = () => {
  return <Icon color="primary">search</Icon>;
};

const Wrapper: FC<SelectProps> = (props: SelectProps) => {
  const theme = useTheme();

  return (
    <Select
      isClearable
      placeholder="Search..."
      styles={{
        control: it => ({
          ...it,
          padding: "10px",
          borderRadius: "50px"
        })
      }}
      theme={it => ({
        ...it,
        colors: {
          ...it.colors,
          primary: theme.palette.primary.main
        }
      })}
      components={{
        DropdownIndicator,
        IndicatorSeparator: null
      }}
      {...props}
    />
  );
};

export default Wrapper;
