import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardActions, Typography, Button } from "@mui/material";

const UserDashboard = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 350, p: 2, borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
        <Box sx={{ fontSize: 50, mb: 1 }}>📚</Box>
        <Typography variant="h5" fontWeight={600}>Available Books</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>Check all books currently available.</Typography>
        <CardActions sx={{ justifyContent: "center" }}>
          <Link to="/user/dashboard/GetAvailableBooks" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Available Books</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserDashboard;
