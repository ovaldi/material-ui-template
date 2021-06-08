import React, { FC, ReactNode } from "react";
import {
  useTheme,
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions
} from "@material-ui/core";

export interface PanelProps {
  title: ReactNode;
  actions?: ReactNode;
}

export const Panel: FC<PanelProps> = ({ title, actions, children }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        overflow: "visible",
        marginBottom: theme.spacing(3)
      }}
      elevation={0}
    >
      <CardActions
        style={{
          padding: theme.spacing(4),
          paddingBottom: theme.spacing(2)
        }}
      >
        <Typography variant="h5" component="div">
          <b>{title}</b>
        </Typography>
        <div
          style={{
            flex: 1
          }}
        />
        {actions}
      </CardActions>
      <Divider
        style={{
          margin: `0 ${theme.spacing(4)}px`
        }}
      />
      <CardContent
        style={{
          padding: theme.spacing(4),
          paddingTop: theme.spacing(2)
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default Panel;
