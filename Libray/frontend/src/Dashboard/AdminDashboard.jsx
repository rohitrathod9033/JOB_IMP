import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, Typography, Box, Button } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4, mb: "12%" }}>
      <Card
        sx={{ width: 350, p: 2, borderRadius: 3, boxShadow: 4, textAlign: "center", }} >

        <Box sx={{ fontSize: 50, mb: 1 }}>📕</Box>
        <Typography variant="h5" fontWeight={600}>
          Books Borrowed
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          View all borrowed books and user details.
        </Typography>

        {/* Button */}
        <CardActions sx={{ justifyContent: "center" }}>
          <Link to="/admin/dashboard/GetAllBorrowedData" style={{ textDecoration: "none" }}>
            <Button variant="outlined">View Borrowed</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
