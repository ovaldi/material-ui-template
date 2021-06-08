import React, { FC, useEffect } from "react";
import Loader from "components/Loader";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  app: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

export const App: FC = ({ children }) => {
  const styles = useStyles();
  const location = useLocation();
  const ui = useSelector<StoreReducer, UIReducer>(state => state.ui);

  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <div className={styles.app}>
      {ui.loading > 0 && <Loader />}
      {children}
    </div>
  );
};

export default App;
