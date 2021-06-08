import React, { FC } from "react";
import { Container, useTheme } from "@material-ui/core";

export const Body: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      maxWidth="xl"
      style={{
        padding: theme.spacing(2),
        height: "100%",
        width: "100%"
      }}
    >
      {children}
    </Container>
  );
};

export default Body;
