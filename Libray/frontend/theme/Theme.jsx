import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#452829",
        },
        secondary: {
            main: "#f50057",
        },
        success: {
            main: "#4caf50",
            contrastText: "#fff",
        },
        error: {
            main: "#f44336",
            contrastText: "#fff",
        }
    },
});

export default theme;