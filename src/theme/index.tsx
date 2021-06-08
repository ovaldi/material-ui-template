import "./index.css";
import "typeface-roboto";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
const theme = createMuiTheme();

export default responsiveFontSizes(
  createMuiTheme({
    mixins: {
      toolbar: {
        minHeight: theme.spacing(6),
      },
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: "initial"
        },
        outlined: {
          borderWidth: theme.spacing(0.25)
        }
      },
      MuiCard: {
        root: {
          borderRadius: theme.spacing(3)
        }
      },
      MuiChip: {
        root: {
          height: theme.spacing(6),
          borderRadius: theme.spacing(3),
          color: theme.palette.common.black,
          backgroundColor: "#e8e7f1"
        }
      },
      MuiTableCell: {
        stickyHeader: {
          backgroundColor: "#fff"
        }
      }
    },
    typography: {
      button: {
        textTransform: "initial"
      }
    },
    palette: {
      primary: {
        light: "#867fe9",
        main: "#1976d2",
        dark: "#115293",
        contrastText: "#fff"
      },
      secondary: {
        main: "#A4A4AA"
      },
      background: {
        default: "#f6f7f9"
      }
    }
  })
);
