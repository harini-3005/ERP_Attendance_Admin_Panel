import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E90FF"
    },

    secondary: {
      main: "#00BFFF"
    },

    background: {
      default: "#F5F9FF"
    }
  },

  typography: {
    fontFamily:
      "'Segoe UI', sans-serif"
  }
});

export default theme;