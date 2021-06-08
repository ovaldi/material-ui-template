import React, { useRef, useCallback } from "react";
import theme from "theme";
import ReactDOM from "react-dom";
import Alert from "components/Alert";
import { ThemeProvider } from "@material-ui/styles";

interface IData {
  title: string;
  message: string;
  actions: ReadonlyArray<{
    text: string;
    style?: "default" | "primary";
    onPress?: () => any;
  }>;
}

const useAlert = (): [(opts: IData) => void, () => void] => {
  const div = useRef<HTMLDivElement | null>(null);
  const close = useCallback(() => {
    if (div.current) {
      ReactDOM.unmountComponentAtNode(div.current);
      document.body.removeChild(div.current);
      div.current = null;
    }
  }, []);
  const alert = useCallback(
    (opts: IData) => {
      div.current = document.createElement("div");
      document.body.appendChild(div.current);
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <Alert open={true} onClose={close} {...opts} />
        </ThemeProvider>,
        div.current
      );
    },
    [close]
  );

  return [alert, close];
};

export default useAlert;
