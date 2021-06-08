import React from "react";
import theme from "theme";
import Loader from "components/Loader";
import store, { persistor } from "store";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export const Provider: React.FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </CookiesProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
