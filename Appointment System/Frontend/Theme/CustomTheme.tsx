import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#040D12" },
        secondary: { main: "#6c0078ff" },
        error: { main: "#E74C3C" },
        success: { main: "#037b35ff" },
        info: { main: "#0b619aff" },
        warning: { main: "#F1C40F" },
    },

    typography: {
        fontFamily: "Rubik",
        fontSize: 16,
    }
});

export default theme;