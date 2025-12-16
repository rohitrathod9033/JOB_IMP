import React from "react";
import { Box, Container } from "@mui/material";

const DefaultHome = () => {
    return (
        <Box maxWidth="xl" sx={{ mt: 0.5 }}>
            <Box
                component="img"
                src="../../public/assets/international-day-education-cartoon-style.jpg"
                alt="Library"
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </Box>
    );
};

export default DefaultHome;