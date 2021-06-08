import Sidebar from "../sidebar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import React, { FC, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Route, Redirect, RouteProps } from "react-router-dom";

const useStyles = makeStyles(() => ({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row"
  },
  body: {
    flex: 1,
    height: "100%",
    position: "relative"
  }
}));

export const PrivateRoute: FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const classes = useStyles();
  const location = useLocation();
  const auth = useSelector<any, AuthReducer>(state => state.auth);
  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <Route
      {...rest}
      render={props => {
        return auth.token && Component ? (
          <div className={classes.main}>
            <Sidebar />
            <div className={classes.body}>
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: props.location
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
