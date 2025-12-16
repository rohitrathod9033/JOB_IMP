import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ width: "100%", height: "50px", backgroundColor: "#452829", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body1" align="center">
                © 2025 Library Management System
            </Typography>
        </Box>
    );
};

export default Footer;
